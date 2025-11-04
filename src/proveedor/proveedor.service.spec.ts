import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorService } from './proveedor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proveedor } from './entity/proveedor.entity';
import { Medicamentos } from '../products/entity/products.entity';

describe('ProveedorService', () => {
  let service: ProveedorService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProveedorService,
        {
          provide: getRepositoryToken(Proveedor),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Medicamentos),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProveedorService>(ProveedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
