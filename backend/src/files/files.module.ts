import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsSystemModule } from 'src/logs-system/logs-system.module';

@Module({
  imports: [PrismaModule, LogsSystemModule],
  providers: [FilesService, PrismaService],
  controllers: [FilesController],
})
export class FilesModule {}
