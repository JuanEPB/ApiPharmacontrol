import { Test, TestingModule } from '@nestjs/testing';
import { FarmaciaController } from './farmacia.controller';
import { FarmaciaService } from './farmacia.service';

describe('FarmaciaController', () => {
  let controller: FarmaciaController;

  const mockFarmaciaService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmaciaController],
      providers: [
        {
          provide: FarmaciaService,
          useValue: mockFarmaciaService,
        },
      ],
    }).compile();

    controller = module.get<FarmaciaController>(FarmaciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
