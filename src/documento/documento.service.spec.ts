import { Test, TestingModule } from '@nestjs/testing';
import { DocumentoService } from './documento.service';
import { getModelToken } from '@nestjs/mongoose';
import { Documento } from './schemas/documento.schema';

describe('DocumentoService', () => {
  let service: DocumentoService;

  const mockDocumentoModel = {
    new: jest.fn(),
    constructor: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentoService,
        {
          provide: getModelToken(Documento.name),
          useValue: mockDocumentoModel,
        },
      ],
    }).compile();

    service = module.get<DocumentoService>(DocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
