
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'Nama pasien tidak boleh kosong' })
  @IsString({ message: 'Nama pasien harus berupa teks' })
  @MaxLength(150, { message: 'Nama pasien maksimal 150 karakter' })
  readonly fullName: string;

  @IsNotEmpty({ message: 'Tanggal lahir tidak boleh kosong' })
  @IsDateString({}, { message: 'Format tanggal lahir tidak valid' })
  readonly dateOfBirth: string;

  @IsNotEmpty({ message: 'Jenis kelamin tidak boleh kosong' })
  @IsIn(['male', 'female'], {
    message: 'Jenis kelamin harus male atau female',
  })
  readonly gender: string;

  @IsOptional()
  @IsString({ message: 'Alamat harus berupa teks' })
  readonly address?: string;

  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @Matches(/^\+?[0-9]{8,15}$/, {
    message: 'Nomor telepon harus 8-15 digit',
  })
  readonly phone: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(150, { message: 'Email maksimal 150 karakter' })
  readonly email: string;
}

export class UpdatePatientDto {
  @IsOptional()
  @IsString({ message: 'Nama pasien harus berupa teks' })
  @MaxLength(150, { message: 'Nama pasien maksimal 150 karakter' })
  readonly fullName?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Format tanggal lahir tidak valid' })
  readonly dateOfBirth?: string;

  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'Jenis kelamin harus male atau female',
  })
  readonly gender?: string;

  @IsOptional()
  @IsString({ message: 'Alamat harus berupa teks' })
  readonly address?: string;

  @IsOptional()
  @Matches(/^\+?[0-9]{8,15}$/, {
    message: 'Nomor telepon harus 8-15 digit',
  })
  readonly phone?: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Format email tidak valid' })
  readonly email?: string;
}
