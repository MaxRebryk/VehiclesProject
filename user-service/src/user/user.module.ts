import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { RabbitMqModule } from "../../rabbit-mq/rabbitMq.module";

@Module({
  imports: [RabbitMqModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
