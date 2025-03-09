import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DocumentDto } from './dto/add-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { handleException } from '../../utils/exception-handler.util';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async saveFile(document: DocumentDto ,file:  Express.Multer.File,) {
    const { filename , ownerId} = document
    return this.prisma.document.create({
      data: { filename, fileData: file.buffer, ownerId },
    });
  }
  async updateDocument(id: string ,document: UpdateDocumentDto, file:  Express.Multer.File,) {
    try {
      const payload ={
        ...document,
        ... (file && {
          fileData: file.buffer
        })
      }
      return this.prisma.document.update({
        where:{
          id
        },
        data:payload,
      });
    } catch (error) {
      handleException(error)
    }
  
  }
  async getAllDocument() {
    try {
      return this.prisma.document.findMany();
    } catch (error) {
      handleException(error)
    }
  }

  async deleteDocument(id: string) {
    try{
    await this.prisma.document.delete({ where: { id } });
    return "Deleted successfully."
    }catch(error){
      handleException(error)
    }
  }

  async getDocument(id: string) {
    try{
      return this.prisma.document.findUnique({
        where: { id }, // The `where` clause is required
      });
    }catch(error){
      handleException(error)
    }
  }
}