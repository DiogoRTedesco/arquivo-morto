import { Module } from '@nestjs/common';
import { AccessLevelService } from './access-level.service';
import { AccessLevelController } from './access-level.controller';

@Module({
  providers: [AccessLevelService],
  controllers: [AccessLevelController]
})
export class AccessLevelModule {}
