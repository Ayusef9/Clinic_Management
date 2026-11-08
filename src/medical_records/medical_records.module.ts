import { Module } from '@nestjs/common';
import { MedicalRecordsController } from './medical_records.controller.js';
import { MedicalRecordsService } from './medical_records.service.js';

@Module({
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService]
})
export class MedicalRecordsModule {}
