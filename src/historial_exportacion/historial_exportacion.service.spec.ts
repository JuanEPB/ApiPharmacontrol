import { Test, TestingModule } from '@nestjs/testing';
import { HistorialExportacionService } from './historial_exportacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistorialExportacion } from './entity/historial_exportacion.entity';
import { Usuario } from '../users/entity/users.entity';

describe('HistorialExportacionService', () => {
  let service: HistorialExportacionService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistorialExportacionService,
        {
          provide: getRepositoryToken(HistorialExportacion),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<HistorialExportacionService>(HistorialExportacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
