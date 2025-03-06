import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async saveFile(filename: string, buffer: Buffer, ownerId: string) {
    return this.prisma.document.create({
      data: { filename, fileData: buffer, ownerId },
    });
  }

  async getFile(id: string) {
    return this.prisma.document.findUnique({ where: { id } });
  }
}