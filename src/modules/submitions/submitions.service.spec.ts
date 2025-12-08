import { Test, TestingModule } from '@nestjs/testing';
import { SubmitionsService } from './submitions.service';

describe('SubmitionsService', () => {
  let service: SubmitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitionsService],
    }).compile();

    service = module.get<SubmitionsService>(SubmitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
