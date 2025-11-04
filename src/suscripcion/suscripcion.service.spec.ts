import { Test, TestingModule } from '@nestjs/testing';
import { SuscripcionService } from './suscripcion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Suscripcion } from './entities/suscripcion.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Plan } from '../plan/entities/plan.entity';

describe('SuscripcionService', () => {
  let service: SuscripcionService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuscripcionService,
        {
          provide: getRepositoryToken(Suscripcion),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Plan),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SuscripcionService>(SuscripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
