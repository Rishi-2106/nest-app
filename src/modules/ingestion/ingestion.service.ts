import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IngestionStatus } from 'src/enums/role.enum';
// import { IngestionStatus } from '@prisma/client';

@Injectable()
export class IngestionService {
  constructor(private prisma: PrismaService) {}

  // Start ingestion process
  async startIngestion(documentId: string) {
    const ingestion = await this.prisma.ingestion.create({
      data: {
        documentId,
        status: IngestionStatus.PENDING,
        startedAt: new Date(),
      },
    });

    // Simulate ingestion processing
    setTimeout(async () => {
      const isSuccess = Math.random() > 0.2; // 80% chance success
      const updatedStatus = isSuccess ? IngestionStatus.COMPLETED : IngestionStatus.FAILED;
      await this.prisma.ingestion.update({
        where: { id: ingestion.id },
        data: { status: updatedStatus, completedAt: new Date() },
      });

      // Also update the document status
      await this.prisma.document.update({
        where: { id: documentId },
        data: { status: updatedStatus },
      });
    }, 5000);

    return ingestion;
  }

  // Get ingestion status
  async getIngestionStatus(documentId: string) {
    return this.prisma.ingestion.findMany({
      where: { documentId },
      orderBy: { startedAt: 'desc' },
    });
  }
}