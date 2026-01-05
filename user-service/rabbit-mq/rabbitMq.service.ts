import * as amqp from "amqplib";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RabbitMqService {
  private connection: amqp.ChannelModel;
  private channel: amqp.Channel;

  async connect() {
    const url = process.env.RABBITMQ_URL || "amqp://localhost";
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange("user.events", "topic", {
      durable: true,
    });
  }

  getChannel() {
    return this.channel;
  }

  isConnected(): boolean {
    return !!this.channel && this.channel !== null;
  }
}
