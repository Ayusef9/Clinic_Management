import {Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Department } from '../../departments/entities/department-entity.js';


@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign key column -> departments.id
  @Column({ name: 'department_id', type: 'uuid' })
  departmentId: string;


  @Column({ name: 'full_name', type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'varchar', length: 100 })
  specialization: string;

  @Column({ name: 'license_number', type: 'varchar', length: 50, unique: true })
  licenseNumber: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Department, (department) => department.doctors, {
    nullable: false,
    onDelete: 'RESTRICT',})

  @JoinColumn({ name: 'department_id' })
  department: Department;

  @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at', default: null})
    deletedAt: Date;
}
