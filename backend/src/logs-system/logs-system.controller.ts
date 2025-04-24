import { Controller, Get, Query } from '@nestjs/common';
import { LogsSystemService } from './logs-system.service';

@Controller('logs')
export class LogsSystemController {
    constructor(private readonly logsService: LogsSystemService) { }
    
    @Get()
    async getLogs(
    @Query('userId') userId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.logsService.getLogs(
      userId ? Number(userId) : undefined,
      startDate,
      endDate
    );
  }
}
