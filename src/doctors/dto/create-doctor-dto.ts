import { Transform } from 'class-transformer';
import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches, MaxLength} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty({ message: 'Nama dokter tidak boleh kosong' })
  @IsString({ message: 'Nama dokter harus berupa teks' })
  @MaxLength(150, { message: 'Nama dokter maksimal 150 karakter' })
  readonly fullName: string;

  @IsNotEmpty({ message: 'Spesialisasi tidak boleh kosong' })
  @IsString({ message: 'Spesialisasi harus berupa teks' })
  @MaxLength(100, { message: 'Spesialisasi maksimal 100 karakter' })
  readonly specialization: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(150, { message: 'Email maksimal 150 karakter' })
  readonly email: string;

  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @Matches(/^\+?[0-9]{8,15}$/, {
    message: 'Nomor telepon harus 8-15 digit',
  })
  readonly phone: string;

  @IsNotEmpty({ message: 'Nomor izin praktik tidak boleh kosong' })
  @IsString({ message: 'Nomor izin praktik harus berupa teks' })
  @MaxLength(50, {
    message: 'Nomor izin praktik maksimal 50 karakter',
  })
  readonly licenseNumber: string;

  @IsNotEmpty({ message: 'ID departemen tidak boleh kosong' })
  @IsUUID('all', { message: 'ID departemen harus berupa UUID' })
  readonly departmentId: string;

  @IsOptional()
  @IsBoolean({ message: 'Status aktif harus berupa true atau false' })
  readonly isActive?: boolean;
}

export class UpdateDoctorDto {
  @IsOptional()
  @IsString({ message: 'Nama dokter harus berupa teks' })
  @MaxLength(150, { message: 'Nama dokter maksimal 150 karakter' })
  readonly fullName?: string;

  @IsOptional()
  @IsString({ message: 'Spesialisasi harus berupa teks' })
  @MaxLength(100, { message: 'Spesialisasi maksimal 100 karakter' })
  readonly specialization?: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email?: string;

  @IsOptional()
  @Matches(/^\+?[0-9]{8,15}$/, {
    message: 'Nomor telepon harus 8-15 digit',
  })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'Nomor izin praktik harus berupa teks' })
  @MaxLength(50, {
    message: 'Nomor izin praktik maksimal 50 karakter',
  })
  readonly licenseNumber?: string;

  @IsOptional()
  @IsUUID('all', { message: 'ID departemen harus berupa UUID' })
  readonly departmentId?: string;

  @IsOptional()
  @IsBoolean({ message: 'Status aktif harus berupa true atau false' })
  readonly isActive?: boolean;
}
