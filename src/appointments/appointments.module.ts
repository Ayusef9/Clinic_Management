
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment-entity.js';
import { Patient } from '../patients/entities/patient-entity.js';
import { Doctor } from '../doctors/entities/doctor-entity.js';
import { AppointmentsController } from './appointments.controller.js';
import { AppointmentsService } from './appointments.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Patient, Doctor]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
