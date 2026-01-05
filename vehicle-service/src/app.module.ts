import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { VehicleModule } from './vehicle/vehicle.module';
import { PrismaModule } from 'prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';
import { RabbitMqModule } from '../rabbit-mq/rabbitMq.module';
import { RabbitMqService } from '../rabbit-mq/rabbitMq.service';

@Module({
  imports: [
    PrismaModule,
    VehicleModule,
    RabbitMqModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                },
              }
            : undefined,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private rabbit: RabbitMqService) {}

  async onModuleInit() {
    try {
      await this.rabbit.connect();
      this.logger.log('Successfully connected to RabbitMQ');
    } catch (error) {
      this.logger.error(
        `Failed to connect to RabbitMQ: ${error.message}`,
        error.stack,
      );
      this.logger.warn(
        'Application will continue without RabbitMQ. Make sure RabbitMQ is running for message queue functionality.',
      );
    }
  }
}
