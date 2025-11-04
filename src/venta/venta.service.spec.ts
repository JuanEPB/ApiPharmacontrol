import { Test, TestingModule } from '@nestjs/testing';
import { VentaService } from './venta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { Medicamentos } from '../products/entity/products.entity';
import { Usuario } from '../users/entity/users.entity';
import { DocumentoService } from '../documento/documento.service';
import { HistorialExportacionService } from '../historial_exportacion/historial_exportacion.service';

describe('VentaService', () => {
  let service: VentaService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockDocumentoService = {
    guardarDesdeBuffer: jest.fn(),
  };

  const mockHistorialService = {
    registrar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VentaService,
        {
          provide: getRepositoryToken(Venta),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(VentaDetalle),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Medicamentos),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository,
        },
        {
          provide: DocumentoService,
          useValue: mockDocumentoService,
        },
        {
          provide: HistorialExportacionService,
          useValue: mockHistorialService,
        },
      ],
    }).compile();

    service = module.get<VentaService>(VentaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
