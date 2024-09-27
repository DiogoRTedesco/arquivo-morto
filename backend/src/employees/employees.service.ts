import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return this.prisma.employee.create({ data });
  }

  async updateEmployee(
    id: number,
    data: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async getEmployeeById(id: number): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return employee;
  }

  async getEmployee(name: string): Promise<Employee[]> {
    return this.prisma.employee.findMany({
      where: {
        name: {
          contains: name, // Busca pelo nome parcial
          mode: 'insensitive', // Case insensitive
        },
      },
    });
  }

  // Adicione outros métodos conforme necessário
}
