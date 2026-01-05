import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbitMq.service';
import { VehicleConsumer } from './vehicle-consumer';

@Module({
  providers: [RabbitMqService, VehicleConsumer],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
