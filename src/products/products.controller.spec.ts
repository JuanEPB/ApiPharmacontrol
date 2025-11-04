import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosController } from './products.controller';
import { MedicamentosService } from './products.service';

describe('MedicamentosController', () => {
  let controller: MedicamentosController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentosController],
      providers: [
        {
          provide: MedicamentosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MedicamentosController>(MedicamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
