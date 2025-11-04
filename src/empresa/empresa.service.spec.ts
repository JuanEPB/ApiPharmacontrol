import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaService } from './empresa.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';
import { Suscripcion } from '../suscripcion/entities/suscripcion.entity';

describe('EmpresaService', () => {
  let service: EmpresaService;

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
        EmpresaService,
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Plan),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Suscripcion),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmpresaService>(EmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
