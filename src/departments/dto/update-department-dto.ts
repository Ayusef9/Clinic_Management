import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from '../dto/create-department-dto.js';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {}