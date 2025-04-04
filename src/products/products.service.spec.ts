import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosService } from './products.service';

describe('ProductsService', () => {
  let service: MedicamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicamentosService],
    }).compile();

    service = module.get<MedicamentosService>(MedicamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
