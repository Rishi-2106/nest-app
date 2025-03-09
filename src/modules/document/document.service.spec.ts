import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('DocumentService', () => {
  let service: DocumentService;
  let prisma: PrismaService;

  const mockPrismaService = {
    document: {
      getAllDocument: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Doc' }]),
      findMany: jest.fn().mockResolvedValue([{ id: '1', filename: 'test.pdf' }]),
      findUnique: jest.fn().mockImplementation(({ where }) => 
        Promise.resolve({ id: where.id, filename: 'test.pdf' }) // Fix structure
      ),
      delete: jest.fn().mockImplementation((id) => Promise.resolve({ id, deleted: true })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        JwtService,
        PrismaService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should get all documents', async () => {
    const data = await service.getAllDocument()
    expect(data).toEqual([{ id: '1', filename: 'test.pdf' }]);
    expect(prisma.document.findMany).toHaveBeenCalled();
  });

  it('should get a document by ID', async () => {
    expect(await service.getDocument('1')).toEqual({ id: '1', filename: 'test.pdf' });
    expect(prisma.document.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should delete a document', async () => {
    expect(await service.deleteDocument('1')).toEqual("Deleted successfully.");
    expect(prisma.document.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
