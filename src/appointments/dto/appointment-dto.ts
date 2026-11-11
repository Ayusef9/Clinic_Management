
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AppointmentStatus } from '../entities/appointment-entity.js';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'ID pasien tidak boleh kosong' })
  @IsUUID('all', { message: 'ID pasien harus berupa UUID' })
  readonly patientId: string;

  @IsNotEmpty({ message: 'ID dokter tidak boleh kosong' })
  @IsUUID('all', { message: 'ID dokter harus berupa UUID' })
  readonly doctorId: string;

  @IsNotEmpty({ message: 'Tanggal janji temu tidak boleh kosong' })
  @IsDateString({}, { message: 'Format tanggal janji temu tidak valid' })
  readonly appointmentDate: string;

  @IsOptional()
  @IsString({ message: 'Alasan harus berupa teks' })
  readonly reason?: string;
}

export class UpdateAppointmentDto {
  @IsOptional()
  @IsUUID('all', { message: 'ID pasien harus berupa UUID' })
  readonly patientId?: string;

  @IsOptional()
  @IsUUID('all', { message: 'ID dokter harus berupa UUID' })
  readonly doctorId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Format tanggal janji temu tidak valid' })
  readonly appointmentDate?: string;

  @IsOptional()
  @IsString({ message: 'Alasan harus berupa teks' })
  readonly reason?: string;
}

export class UpdateAppointmentStatusDto {
  @IsNotEmpty({ message: 'Status janji temu tidak boleh kosong' })
  @IsIn(Object.values(AppointmentStatus), {
    message: 'Status harus pending, confirmed, completed, atau cancelled',
  })
  readonly status: AppointmentStatus;
}
