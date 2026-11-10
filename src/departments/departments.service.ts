import {Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department-entity.js';
import { CreateDepartmentDto } from './dto/create-department-dto.js';
import { UpdateDepartmentDto } from './dto/update-department-dto.js';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(dto: CreateDepartmentDto) {
    const existing = await this.departmentRepository.findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Nama departemen sudah digunakan');
    }

    const department = this.departmentRepository.create(dto);
    return this.departmentRepository.save(department);
  }

  async findAll() {
    return this.departmentRepository.find({
      relations: { doctors: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: { doctors: true },
    });

    if (!department) {
      throw new NotFoundException('Departemen tidak ditemukan');
    }

    return department;
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    const department = await this.findOne(id);

    if (dto.name && dto.name !== department.name) {
      const existing = await this.departmentRepository.findOne({
        where: { name: dto.name },
      });

      if (existing) {
        throw new ConflictException('Nama departemen sudah digunakan');
      }
    }

    Object.assign(department, dto);
    return this.departmentRepository.save(department);
  }

  async remove(id: string) {
    const department = await this.findOne(id);

    await this.departmentRepository.softRemove(department);

    return { message: 'Departemen berhasil dihapus' };
  }
}
