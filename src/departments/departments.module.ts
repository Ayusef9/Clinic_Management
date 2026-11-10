import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../doctors/entities/doctor-entity.js';
import { DepartmentsController } from '../departments/departments.controller.js';
import { DepartmentsService } from '../departments/departments.service.js';
import { Department } from '../departments/entities/department-entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Doctor])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}