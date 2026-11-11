
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecord } from './entities/medical_record-entity.js';
import {
  CreateMedicalRecordDto,
  UpdateMedicalRecordDto,
} from './dto/medical_record-dto.js';
import {
  Appointment,
  AppointmentStatus,
} from '../appointments/entities/appointment-entity.js';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly recordRepository: Repository<MedicalRecord>,

    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(dto: CreateMedicalRecordDto) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: dto.appointmentId },
      relations: { medicalRecord: true },
    });

    if (!appointment) {
      throw new NotFoundException('Janji temu tidak ditemukan');
    }

    if (appointment.status === AppointmentStatus.CANCELLED) {
      throw new BadRequestException(
        'Janji temu yang dibatalkan tidak dapat memiliki rekam kunjungan',
      );
    }

    if (appointment.medicalRecord) {
      throw new ConflictException(
        'Rekam kunjungan untuk janji temu ini sudah tersedia',
      );
    }

    const record = this.recordRepository.create({
      ...dto,
      visitDate: new Date(dto.visitDate),
    });

    const saved = await this.recordRepository.save(record);

    appointment.status = AppointmentStatus.COMPLETED;
    await this.appointmentRepository.save(appointment);

    return saved;
  }

  async findAll() {
    return this.recordRepository.find({
      relations: {
        appointment: {
          patient: true,
          doctor: true,
        },
      },
      order: { visitDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.recordRepository.findOne({
      where: { id },
      relations: {
        appointment: {
          patient: true,
          doctor: { department: true },
        },
      },
    });

    if (!record) {
      throw new NotFoundException('Rekam kunjungan tidak ditemukan');
    }

    return record;
  }

  async update(id: string, dto: UpdateMedicalRecordDto) {
    const record = await this.findOne(id);

    Object.assign(record, {
      ...dto,
      visitDate: dto.visitDate
        ? new Date(dto.visitDate)
        : record.visitDate,
    });

    return this.recordRepository.save(record);
  }

  async remove(id: string) {
    const record = await this.findOne(id);

    await this.recordRepository.remove(record);

    return { message: 'Rekam kunjungan berhasil dihapus' };
  }
}
