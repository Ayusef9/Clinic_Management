import {Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor-entity.js';
import { Department } from '../departments/entities/department-entity.js';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/create-doctor-dto.js';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(dto: CreateDoctorDto) {
    const department = await this.departmentRepository.findOne({
      where: { id: dto.departmentId },
    });

    if (!department) {
      throw new NotFoundException('Departemen tidak ditemukan');
    }

    const existing = await this.doctorRepository.findOne({
      where: [
        { email: dto.email },
        { licenseNumber: dto.licenseNumber },
      ],
    });

    if (existing) {
      throw new ConflictException('Email atau nomor izin praktik sudah digunakan');
    }

    const doctor = this.doctorRepository.create(dto);
    return this.doctorRepository.save(doctor);
  }

  async findAll() {
    return this.doctorRepository.find({
      relations: { department: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: { department: true },
    });

    if (!doctor) {
      throw new NotFoundException('Dokter tidak ditemukan');
    }

    return doctor;
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);

    if (dto.departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { id: dto.departmentId },
      });

      if (!department) {
        throw new NotFoundException('Departemen tidak ditemukan');
      }
    }

    if (dto.email || dto.licenseNumber) {
      const existing = await this.doctorRepository
        .createQueryBuilder('doctor')
        .where('doctor.id != :id', { id })
        .andWhere(
          '(doctor.email = :email OR doctor.license_number = :licenseNumber)',
          {
            email: dto.email ?? doctor.email,
            licenseNumber: dto.licenseNumber ?? doctor.licenseNumber,
          },
        )
        .getOne();

      if (existing) {
        throw new ConflictException('Email atau nomor izin praktik sudah digunakan');
      }
    }

    Object.assign(doctor, dto);
    return this.doctorRepository.save(doctor);
  }

  async remove(id: string) {
    const doctor = await this.findOne(id);
    await this.doctorRepository.softRemove(doctor);

    return { message: 'Dokter berhasil dihapus' };
  }
}
