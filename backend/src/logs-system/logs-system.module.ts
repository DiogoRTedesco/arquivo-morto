import { Module } from '@nestjs/common';
import { LogsSystemService } from './logs-system.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogsSystemController } from './logs-system.controller';

@Module({
  providers: [LogsSystemService, PrismaService],
  exports: [LogsSystemService],
  controllers: [LogsSystemController]
})
export class LogsSystemModule {}
