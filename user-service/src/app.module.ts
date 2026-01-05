import { Module, OnModuleInit, Logger } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "../src/auth/auth.module";
import { RabbitMqModule } from "../rabbit-mq/rabbitMq.module";
import { RabbitMqService } from "rabbit-mq/rabbitMq.service";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    RabbitMqModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
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
      this.logger.log("Successfully connected to RabbitMQ");
    } catch (error) {
      this.logger.error(
        `Failed to connect to RabbitMQ: ${error.message}`,
        error.stack
      );
      this.logger.warn(
        "Application will continue without RabbitMQ. Make sure RabbitMQ is running for message queue functionality."
      );
    }
  }
}
