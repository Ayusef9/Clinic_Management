
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient-entity.js';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient-dto.js';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(dto: CreatePatientDto) {
    const existing = await this.patientRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email pasien sudah digunakan');
    }

    const patient = this.patientRepository.create(dto);
    return this.patientRepository.save(patient);
  }

  async findAll() {
    return this.patientRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: { appointments: true },
    });

    if (!patient) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    return patient;
  }

  async update(id: string, dto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    if (dto.email && dto.email !== patient.email) {
      const existing = await this.patientRepository.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new ConflictException('Email pasien sudah digunakan');
      }
    }

    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    await this.patientRepository.softRemove(patient);

    return { message: 'Pasien berhasil dihapus' };
  }
}
