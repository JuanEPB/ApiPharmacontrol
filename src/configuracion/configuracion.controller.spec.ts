import { Test, TestingModule } from '@nestjs/testing';
import { ConfiguracionController } from './configuracion.controller';
import { ConfiguracionService } from './configuracion.service';

describe('ConfiguracionController', () => {
  let controller: ConfiguracionController;

  const mockConfiguracionService = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfiguracionController],
      providers: [
        {
          provide: ConfiguracionService,
          useValue: mockConfiguracionService,
        },
      ],
    }).compile();

    controller = module.get<ConfiguracionController>(ConfiguracionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
