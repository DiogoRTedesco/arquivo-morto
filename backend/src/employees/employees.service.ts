import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateEmployeeDto } from './dto/create-employee.dto';
import { LogsSystemService } from 'src/logs-system/logs-system.service';
import { LogsEnum } from 'src/logs-system/enum/logs.enum';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService,
    private readonly logsService: LogsSystemService
  ) {}

  async createEmployee(data: Prisma.EmployeeCreateInput, userId:number) {
    //return this.prisma.employee.create({ data });
    try {
      const newEmployee = await this.prisma.employee.create({ data })
      
      await this.logsService.createLogs(LogsEnum.CRIAR_EMPREGADO, userId, { newEmployee: newEmployee.id })
      
      return newEmployee
    } catch (error) {
      await this.logsService.createLogs(LogsEnum.CRIAR_EMPREGADO_FAILED, userId, {
        errorMessage: error.message,
        attemptedData: { ...this.createEmployee }
      });
      throw new Error(`Erro ao criar empregado: ${error.message}`)
    }
  }

  async updateEmployee(id: number, data: CreateEmployeeDto, userId: number): Promise<Employee> {
    try { 
      const updateEmployee = await this.prisma.employee.update({ where: { id }, data, })
      await this.logsService.createLogs(LogsEnum.UPDATE_EMPREGADO, userId, { updateEmployee: updateEmployee.id })

      return updateEmployee
    } catch (error) {
      await this.logsService.createLogs(LogsEnum.UPDATE_EMPREGADO_FAILED, userId, {
        errorMessage: error.message,
        attemptedData: {...data}
      })
      throw new Error(`Erro ao editar empregado: ${error.message}`)
    }
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
