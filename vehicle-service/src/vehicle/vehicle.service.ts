import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVehicleDto, userId: string) {
    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...dto,
        userId,
      },
    });
    return vehicle;
  }

  async update(dto: UpdateVehicleDto, id: number) {
    const vehicle = await this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });

    return vehicle;
  }

  async findMy(userId: string) {
    return this.prisma.vehicle.findMany({ where: { userId } });
  }

  async findAll() {
    return this.prisma.vehicle.findMany({});
  }

  async delete(id: number, userId: string) {
    return this.prisma.vehicle.deleteMany({
      where: { id: id, userId: userId },
    });
  }
}
