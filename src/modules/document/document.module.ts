import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [DocumentService, PrismaService, JwtService],
  controllers: [DocumentController]
})
export class DocumentModule {}
