
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsNotEmpty({ message: 'ID janji temu tidak boleh kosong' })
  @IsUUID('all', { message: 'ID janji temu harus berupa UUID' })
  readonly appointmentId: string;

  @IsNotEmpty({ message: 'Tanggal kunjungan tidak boleh kosong' })
  @IsDateString({}, { message: 'Format tanggal kunjungan tidak valid' })
  readonly visitDate: string;

  @IsNotEmpty({ message: 'Keluhan tidak boleh kosong' })
  @IsString({ message: 'Keluhan harus berupa teks' })
  readonly complaint: string;

  @IsOptional()
  @IsString({ message: 'Pemeriksaan harus berupa teks' })
  readonly examination?: string;

  @IsOptional()
  @IsString({ message: 'Catatan harus berupa teks' })
  readonly notes?: string;
}

export class UpdateMedicalRecordDto {
  @IsOptional()
  @IsDateString({}, { message: 'Format tanggal kunjungan tidak valid' })
  readonly visitDate?: string;

  @IsOptional()
  @IsString({ message: 'Keluhan harus berupa teks' })
  readonly complaint?: string;

  @IsOptional()
  @IsString({ message: 'Pemeriksaan harus berupa teks' })
  readonly examination?: string;

  @IsOptional()
  @IsString({ message: 'Catatan harus berupa teks' })
  readonly notes?: string;
}
