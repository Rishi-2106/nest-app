import { Controller, Post, Get, Param } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  // Start document ingestion
  @Post(':documentId')
  async startIngestion(@Param('documentId') documentId: string) {
    return this.ingestionService.startIngestion(documentId);
  }

  // Get document ingestion status
  @Get(':documentId/status')
  async getIngestionStatus(@Param('documentId') documentId: string) {
    return this.ingestionService.getIngestionStatus(documentId);
  }
}