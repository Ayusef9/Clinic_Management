import {Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor-entity.js';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100})
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

 @OneToMany(() => Doctor, (doctor) => doctor.department)
  doctors: Doctor[];

  @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', default: null})
    deletedAt: Date;
}
