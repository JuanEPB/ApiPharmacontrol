import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicamentos } from './entity/products.entity';
import { Proveedor } from '../proveedor/entity/proveedor.entity';
import { Categoria } from '../categorias/entity/categorias.entity';

describe('MedicamentosService', () => {
  let service: MedicamentosService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicamentosService,
        {
          provide: getRepositoryToken(Medicamentos),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Categoria),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MedicamentosService>(MedicamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
