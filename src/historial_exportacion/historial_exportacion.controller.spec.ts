import { Test, TestingModule } from '@nestjs/testing';
import { HistorialExportacionController } from './historial_exportacion.controller';
import { HistorialExportacionService } from './historial_exportacion.service';

describe('HistorialExportacionController', () => {
  let controller: HistorialExportacionController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByFecha: jest.fn(),
    findByNombreUsuario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialExportacionController],
      providers: [
        {
          provide: HistorialExportacionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<HistorialExportacionController>(HistorialExportacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
