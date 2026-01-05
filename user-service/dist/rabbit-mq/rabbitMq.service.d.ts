import * as amqp from "amqplib";
export declare class RabbitMqService {
    private connection;
    private channel;
    connect(): Promise<void>;
    getChannel(): amqp.Channel;
    isConnected(): boolean;
}
