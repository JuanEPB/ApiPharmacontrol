import { Test, TestingModule } from '@nestjs/testing';
import { HistorialExportacionService } from './historial_exportacion.service';

describe('HistorialExportacionService', () => {
  let service: HistorialExportacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialExportacionService],
    }).compile();

    service = module.get<HistorialExportacionService>(HistorialExportacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
