import { Test, TestingModule } from '@nestjs/testing';
import { SubmitionsController } from './submitions.controller';

describe('SubmitionsController', () => {
  let controller: SubmitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitionsController],
    }).compile();

    controller = module.get<SubmitionsController>(SubmitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
