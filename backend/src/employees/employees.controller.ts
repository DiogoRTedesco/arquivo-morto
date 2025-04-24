import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, userId: ParseIntPipe) {
    return this.employeesService.createEmployee(createEmployeeDto, Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateEmployeeDto, userId: ParseIntPipe
  ) {
    return this.employeesService.updateEmployee(id, data, Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEmployeeById(@Param('id') id: string) {
    const numericId = parseInt(id, 10); // Converte para número
    if (isNaN(numericId)) {
      throw new BadRequestException('ID inválido');
    }
    return this.employeesService.getEmployeeById(numericId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getEmployee(@Query('name') name: string) {
    return this.employeesService.getEmployee(name);
  }

  
}
