import { Test, TestingModule } from '@nestjs/testing';
import { LogsSystemController } from './logs-system.controller';

describe('LogsSystemController', () => {
  let controller: LogsSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsSystemController],
    }).compile();

    controller = module.get<LogsSystemController>(LogsSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
