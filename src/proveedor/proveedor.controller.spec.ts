import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';

describe('ProveedorController', () => {
  let controller: ProveedorController;

  const mockService = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveedorController],
      providers: [
        {
          provide: ProveedorService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProveedorController>(ProveedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
