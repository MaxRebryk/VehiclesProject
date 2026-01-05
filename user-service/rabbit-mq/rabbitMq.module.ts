import { Module } from "@nestjs/common";
import { RabbitMqService } from "./rabbitMq.service";

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
