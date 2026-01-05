import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Req() req, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVehicleDto) {
    return this.vehicleService.update(dto, id);
  }

  @Get()
  findAllMy(@Req() req) {
    return this.vehicleService.findMy(req.user.sub);
  }

  @Get('all')
  findAll() {
    return this.vehicleService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.vehicleService.delete(id, req.user.sub);
  }
}
