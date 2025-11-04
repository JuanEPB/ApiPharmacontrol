import { Test, TestingModule } from '@nestjs/testing';
import { FarmaciaService } from './farmacia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farmacia } from './entities/farmacia.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { PlanService } from '../plan/plan.service';

describe('FarmaciaService', () => {
  let service: FarmaciaService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockPlanService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmaciaService,
        {
          provide: getRepositoryToken(Farmacia),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockRepository,
        },
        {
          provide: PlanService,
          useValue: mockPlanService,
        },
      ],
    }).compile();

    service = module.get<FarmaciaService>(FarmaciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
