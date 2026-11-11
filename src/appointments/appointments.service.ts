
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Appointment,
  AppointmentStatus,
} from './entities/appointment-entity.js';
import { Patient } from '../patients/entities/patient-entity.js';
import { Doctor } from '../doctors/entities/doctor-entity.js';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  UpdateAppointmentStatusDto,
} from './dto/appointment-dto.js';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const patient = await this.patientRepository.findOne({
      where: { id: dto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const doctor = await this.doctorRepository.findOne({
      where: { id: dto.doctorId, isActive: true },
    });

    if (!doctor) {
      throw new NotFoundException('Dokter tidak ditemukan atau tidak aktif');
    }

    const date = new Date(dto.appointmentDate);

    if (date <= new Date()) {
      throw new BadRequestException(
        'Tanggal janji temu harus lebih dari waktu sekarang',
      );
    }

    const appointment = this.appointmentRepository.create({
      ...dto,
      appointmentDate: date,
    });

    return this.appointmentRepository.save(appointment);
  }

  async findAll() {
    return this.appointmentRepository.find({
      relations: {
        patient: true,
        doctor: { department: true },
        medicalRecord: true,
      },
      order: { appointmentDate: 'ASC' },
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: {
        patient: true,
        doctor: { department: true },
        medicalRecord: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Janji temu tidak ditemukan');
    }

    return appointment;
  }

  async update(id: string, dto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    if (appointment.status === AppointmentStatus.CANCELLED ||
        appointment.status === AppointmentStatus.COMPLETED) {
      throw new BadRequestException(
        'Janji temu yang sudah selesai atau dibatalkan tidak dapat diubah',
      );
    }

    if (dto.patientId) {
      const patient = await this.patientRepository.findOne({
        where: { id: dto.patientId },
      });

      if (!patient) {
        throw new NotFoundException('Pasien tidak ditemukan');
      }
    }

    if (dto.doctorId) {
      const doctor = await this.doctorRepository.findOne({
        where: { id: dto.doctorId, isActive: true },
      });

      if (!doctor) {
        throw new NotFoundException('Dokter tidak ditemukan atau tidak aktif');
      }
    }

    if (dto.appointmentDate) {
      const date = new Date(dto.appointmentDate);

      if (date <= new Date()) {
        throw new BadRequestException('Tanggal janji temu harus di masa depan');
      }

      appointment.appointmentDate = date;
    }

    Object.assign(appointment, {
      ...dto,
      appointmentDate: dto.appointmentDate
        ? new Date(dto.appointmentDate)
        : appointment.appointmentDate,
    });

    return this.appointmentRepository.save(appointment);
  }

  async updateStatus(id: string, dto: UpdateAppointmentStatusDto) {
    const appointment = await this.findOne(id);

    if (
      appointment.status === AppointmentStatus.CANCELLED ||
      appointment.status === AppointmentStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Status janji temu yang sudah final tidak dapat diubah',
      );
    }

    if (dto.status === AppointmentStatus.COMPLETED) {
      throw new BadRequestException(
        'Gunakan proses penyelesaian kunjungan untuk menyelesaikan janji temu',
      );
    }

    appointment.status = dto.status;
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);

    if (appointment.medicalRecord) {
      throw new BadRequestException(
        'Janji temu yang memiliki rekam kunjungan tidak dapat dihapus',
      );
    }

    await this.appointmentRepository.softRemove(appointment);

    return { message: 'Janji temu berhasil dihapus' };
  }
}
