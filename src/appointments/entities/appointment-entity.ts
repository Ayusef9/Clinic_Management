import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Patient } from '../../patients/entities/patient-entity.js';
import type { Doctor } from '../../doctors/entities/doctor-entity.js';
import type { MedicalRecord } from '../../medical_records/entities/medical_record-entity.js';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', type: 'uuid' })
  patientId: string;

  @Column({ name: 'doctor_id', type: 'uuid' })
  doctorId: string;

  @Column({ name: 'appointment_date', type: 'timestamp' })
  appointmentDate: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  reason: string | null;

  @ManyToOne('Patient', 'appointments', {
    nullable: false,
    onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne('Doctor', 'appointments', {
    nullable: false,
    onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;



  @OneToOne('MedicalRecord', 'appointment')
    medicalRecord: MedicalRecord;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}