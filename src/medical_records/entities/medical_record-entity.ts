import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Appointment } from '../../appointments/entities/appointment-entity.js';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'appointment_id', type: 'uuid', unique: true })
  appointmentId: string;

  @Column({ name: 'visit_date', type: 'timestamp' })
  visitDate: Date;

  @Column({ type: 'text' })
  complaint: string;

  @Column({ type: 'text', nullable: true })
  examination: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @OneToOne('Appointment', 'medicalRecord', {
    nullable: false,
    onDelete: 'RESTRICT',
    })
  @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}