import { Test, TestingModule } from '@nestjs/testing';
import { HistorialExportacionController } from './historial_exportacion.controller';

describe('HistorialExportacionController', () => {
  let controller: HistorialExportacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialExportacionController],
    }).compile();

    controller = module.get<HistorialExportacionController>(HistorialExportacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
