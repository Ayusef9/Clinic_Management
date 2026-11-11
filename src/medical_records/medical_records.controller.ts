
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
import { MedicalRecordsService } from './medical_records.service.js';
import {
  CreateMedicalRecordDto,
  UpdateMedicalRecordDto,
} from './dto/medical_record-dto.js';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(
    private readonly medicalRecordsService: MedicalRecordsService,
  ) {}

  @Post()
  create(@Body() dto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicalRecordsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.medicalRecordsService.remove(id);
  }
}
