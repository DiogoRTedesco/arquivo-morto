import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LogsSystemModule } from 'src/logs-system/logs-system.module';
import { AccessLevelService } from 'src/access-level/access-level.service';

@Module({
  imports: [PrismaModule, LogsSystemModule],
  providers: [UsersService, AccessLevelService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
