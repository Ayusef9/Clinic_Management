
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical_record-entity.js';
import { Appointment } from '../appointments/entities/appointment-entity.js';
import { MedicalRecordsController } from './medical_records.controller.js';
import { MedicalRecordsService } from './medical_records.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord, Appointment]),
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
