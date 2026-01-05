import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Logger } from "nestjs-pino";
import { PrismaService } from "../../prisma/prisma.service";
import { RabbitMqService } from "rabbit-mq/rabbitMq.service";

@Injectable()
export class UserService {
  constructor(
    private readonly rabbit: RabbitMqService,
    private readonly prisma: PrismaService,
    private readonly logger: Logger
  ) {}

  private async publishUserCreated(user: any) {
    try {
      const channel = this.rabbit.getChannel();
      if (!channel) {
        this.logger.warn(
          "RabbitMQ channel not available, skipping message publish"
        );
        return;
      }
      const message = {
        event: "user.created",
        data: { id: user.id },
      };
      const published = channel.publish(
        "user.events",
        "user.created",
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
      if (published) {
        this.logger.log(
          `Published user.created event for user ${user.id}: ${JSON.stringify(message)}`
        );
      } else {
        this.logger.warn(
          `Failed to publish user.created event for user ${user.id} - channel buffer full`
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to publish user.created event: ${error.message}`,
        error.stack
      );
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const { confirmPassword, ...data } = createUserDto;

    const user = await this.prisma.user.create({
      data,
    });

    await this.publishUserCreated(user);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  updateRefreshToken(id: string, refreshToken: string | null) {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
