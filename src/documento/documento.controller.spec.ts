import { Test, TestingModule } from '@nestjs/testing';
import { DocumentoController } from './documento.controller';
import { DocumentoService } from './documento.service';
import { HistorialExportacionService } from '../historial_exportacion/historial_exportacion.service';
import { UsersService } from '../users/users.service';

describe('DocumentoController', () => {
  let controller: DocumentoController;

  const mockDocumentoService = {
    guardarDesdeBuffer: jest.fn(),
    obtenerDocumentoPorId: jest.fn(),
    listarDocumentos: jest.fn(),
    obtenerPorTipoReporte: jest.fn(),
  };

  const mockHistorialService = {
    registrar: jest.fn(),
    findAll: jest.fn(),
  };

  const mockUserService = {
    findById: jest.fn(),
    findAll: jest.fn(),

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentoController],
      providers: [
        {
          provide: DocumentoService,
          useValue: mockDocumentoService,
        },
        {
          provide: HistorialExportacionService,
          useValue: mockHistorialService,
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<DocumentoController>(DocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
