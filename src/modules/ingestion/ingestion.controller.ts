import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('ingestion')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  // Start document ingestion
  @Post(':documentId')
  @Roles(Role.ADMIN)
  async startIngestion(@Param('documentId') documentId: string) {
    return this.ingestionService.startIngestion(documentId);
  }

  // Get document ingestion status
  @Get(':documentId/status')
  @Roles(Role.ADMIN)
  async getIngestionStatus(@Param('documentId') documentId: string) {
    return this.ingestionService.getIngestionStatus(documentId);
  }
}