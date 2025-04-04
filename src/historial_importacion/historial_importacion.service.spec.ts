import { Test, TestingModule } from '@nestjs/testing';
import { HistorialImportacionService } from './historial_importacion.service';

describe('HistorialImportacionService', () => {
  let service: HistorialImportacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialImportacionService],
    }).compile();

    service = module.get<HistorialImportacionService>(HistorialImportacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
