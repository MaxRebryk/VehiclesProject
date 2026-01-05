import { OnModuleInit } from "@nestjs/common";
import { RabbitMqService } from "rabbit-mq/rabbitMq.service";
export declare class AppModule implements OnModuleInit {
    private rabbit;
    private readonly logger;
    constructor(rabbit: RabbitMqService);
    onModuleInit(): Promise<void>;
}
