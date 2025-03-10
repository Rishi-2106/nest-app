import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('DocumentController', () => {
  let controller: DocumentController;
  let service: DocumentService;

  const mockDocumentService = {
    getAllDocument: jest.fn(() => [{ id: '1', filename: 'test.pdf' }]),
    getDocument: jest.fn((id) => ({ id, filename: 'test.pdf' })),
    deleteDocument: jest.fn((id) => ({ id, deleted: true })), 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [PrismaService,JwtService,{ provide: DocumentService, useValue: mockDocumentService }],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all documents', async () => {
    expect(await controller.getAllDocuments()).toEqual([{ id: '1', filename: 'test.pdf' }]);
    expect(service.getAllDocument).toHaveBeenCalled();
  });

  it('should get a document by ID', async () => {
    expect(await controller.getDocument('1')).toEqual({ id: '1', filename: 'test.pdf' });
    expect(service.getDocument).toHaveBeenCalledWith('1');
  });

  it('should delete a document', async () => {
    expect(await controller.deleteDocument('1')).toEqual({ id: '1', deleted: true });
    expect(service.deleteDocument).toHaveBeenCalledWith('1');
  });
});
