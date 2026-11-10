import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Nama departemen tidak boleh kosong' })
  @IsString({ message: 'Nama departemen harus berupa teks' })
  @MaxLength(100, { message: 'Nama departemen maksimal 100 karakter' })
  readonly name: string;

  @IsString({ message: 'Deskripsi harus berupa teks' })
  @MaxLength(1000, { message: 'Deskripsi maksimal 1000 karakter' })
  readonly description?: string;
}