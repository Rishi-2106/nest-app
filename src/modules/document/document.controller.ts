import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/upload-document.dto';
import { handleException } from 'src/utils/exception-handler.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}


    @Post('/upload')
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File, @Body() documentData: DocumentDto) {
      try {
        return await this.documentService.saveFile(documentData,file);
      } catch (error) {
        handleException(error);
      }
    }
  
    @Put(':id')
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async updateDocument(@UploadedFile() file: Express.Multer.File, @Body() documentData: UpdateDocumentDto,  @Param('id') id: string,) {
      try {
        return await this.documentService.updateDocument(id,documentData,file);
      } catch (error) {
        handleException(error);
      }
    }

    @Get('/all')
    @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
    async GetAllDocument(
    ) {
      try {
        return await this.documentService.getAllDocument();
      } catch (error) {
        handleException(error);
      }
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    async GetDocument(
      @Param('id') id: string,
    ) {
      try {
        return await this.documentService.getDocument(id);
      } catch (error) {
        handleException(error);
      }
    }

    @Delete(':id')
    async deleteDocument(@Param('id') id: string,) {
      try {
        return await this.documentService.deleteDocument(id);
      } catch (error) {
        handleException(error);
      }
    }

}
