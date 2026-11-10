import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor-entity.js';
import { Department } from '../departments/entities/department-entity.js';
import { DoctorsController } from './doctors.controller.js';
import { DoctorsService } from './doctors.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Department])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
