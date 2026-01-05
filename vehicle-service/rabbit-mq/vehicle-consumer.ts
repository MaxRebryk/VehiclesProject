import {
  Injectable,
  OnApplicationBootstrap,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { RabbitMqService } from './rabbitMq.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VehicleConsumer implements OnApplicationBootstrap {
  private readonly logger = new Logger(VehicleConsumer.name);

  constructor(
    private rabbit: RabbitMqService,
    private prisma: PrismaService,
  ) {}

  private async handleUserCreated(data: { id: number | string }) {
    try {
      await this.prisma.vehicle.create({
        data: {
          userId: String(data.id),
        },
      });
      this.logger.log(`Created vehicle record for user ${data.id}`);
    } catch (error) {
      this.logger.error(
        `Failed to create vehicle for user ${data.id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async onApplicationBootstrap() {
    await this.waitForRabbitMQ();

    try {
      const channel = this.rabbit.getChannel();
      if (!channel) {
        this.logger.warn(
          'RabbitMQ channel not available, consumer will not start',
        );
        return;
      }

      const queue = 'vehicle.user.created';
      await channel.assertQueue(queue, { durable: true });

      await channel.bindQueue(queue, 'user.events', 'user.created');

      this.logger.log(`Started consuming from queue: ${queue}`);

      channel.consume(
        queue,
        async (msg) => {
          if (!msg) {
            return;
          }

          try {
            const payload = JSON.parse(msg.content.toString());
            this.logger.log(`Received message: ${JSON.stringify(payload)}`);

            await this.handleUserCreated(payload.data);

            channel.ack(msg);
          } catch (error) {
            this.logger.error(
              `Error processing message: ${error.message}`,
              error.stack,
            );

            channel.nack(msg, false, false);
          }
        },
        { noAck: false },
      );
    } catch (error) {
      this.logger.error(
        `Failed to initialize consumer: ${error.message}`,
        error.stack,
      );
    }
  }

  private async waitForRabbitMQ(maxAttempts = 30, delay = 1000) {
    for (let i = 0; i < maxAttempts; i++) {
      if (this.rabbit.isConnected()) {
        this.logger.log('RabbitMQ connection detected, starting consumer');
        return;
      }
      this.logger.debug(
        `Waiting for RabbitMQ connection... (attempt ${i + 1}/${maxAttempts})`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    this.logger.warn('RabbitMQ connection timeout, consumer will not start');
  }
}
