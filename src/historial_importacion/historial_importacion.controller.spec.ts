import { Test, TestingModule } from '@nestjs/testing';
import { HistorialImportacionController } from './historial_importacion.controller';

describe('HistorialImportacionController', () => {
  let controller: HistorialImportacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialImportacionController],
    }).compile();

    controller = module.get<HistorialImportacionController>(HistorialImportacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
