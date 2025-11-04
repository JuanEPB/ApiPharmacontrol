import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracionService } from './configuracion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfiguracionEmpresa } from './entities/configuracion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';

describe('ConfiguracionService', () => {
  let service: ConfiguracionService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfiguracionService,
        {
          provide: getRepositoryToken(ConfiguracionEmpresa),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ConfiguracionService>(ConfiguracionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
