import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsSystemModule } from 'src/logs-system/logs-system.module';

@Module({
  imports: [PrismaModule, LogsSystemModule],
  providers: [EmployeesService, PrismaService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
