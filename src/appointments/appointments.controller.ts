
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service.js';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  UpdateAppointmentStatusDto,
} from './dto/appointment-dto.js';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentsService.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.appointmentsService.remove(id);
  }
}
