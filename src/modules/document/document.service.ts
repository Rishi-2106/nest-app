import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadDto } from './dto/upload-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async saveFile(document: UploadDto ,file:  Express.Multer.File,) {
    const { filename , ownerId} = document
    return this.prisma.document.create({
      data: { filename, fileData: file.buffer, ownerId },
    });
  }

  async getFile(id: string) {
    return this.prisma.document.findUnique({ where: { id } });
  }
}