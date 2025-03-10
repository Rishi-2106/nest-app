import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  UploadedFile, 
  UseGuards, 
  UseInterceptors 
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentDto } from './dto/add-document.dto';
import { handleException } from '../../utils/exception-handler.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { UpdateDocumentDto } from './dto/update-document.dto';

/**
 * DocumentController handles all operations related to document management.
 * It includes endpoints for uploading, updating, fetching, and deleting documents.
 * Access to these endpoints is controlled using authentication and role-based guards.
 */
@Controller('document')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply authentication and authorization guards globally
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  /**
   * Upload a new document.
   * 
   * @param file - Uploaded file (intercepted via Multer)
   * @param documentData - Metadata of the document
   * @returns The saved document response
   * @throws Exception if the upload fails
   */
  @Post('/upload')
  @Roles(Role.ADMIN, Role.EDITOR) // Only Admins and Editors can upload documents
  @UseInterceptors(FileInterceptor('file')) // Intercepts file upload
  async upload(@UploadedFile() file: Express.Multer.File, @Body() documentData: DocumentDto) {
    try {
      return await this.documentService.saveFile(documentData, file);
    } catch (error) {
      handleException(error);
    }
  }

  /**
   * Update an existing document.
   * 
   * @param file - Optional uploaded file
   * @param documentData - Updated document details
   * @param id - Document ID to update
   * @returns The updated document response
   * @throws Exception if the update fails
   */
  @Put(':id')
  @Roles(Role.ADMIN, Role.EDITOR) // Only Admins and Editors can update documents
  @UseInterceptors(FileInterceptor('file'))
  async updateDocument(
    @UploadedFile() file: Express.Multer.File, 
    @Body() documentData: UpdateDocumentDto,  
    @Param('id') id: string
  ) {
    try {
      return await this.documentService.updateDocument(id, documentData, file);
    } catch (error) {
      handleException(error);
    }
  }

  /**
   * Retrieve all documents.
   * 
   * @returns A list of all stored documents
   * @throws Exception if retrieval fails
   */
  @Get('/all')
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER) // All roles can access
  async getAllDocuments() {
    try {
      return await this.documentService.getAllDocument();
    } catch (error) {
      handleException(error);
    }
  }

  /**
   * Retrieve a specific document by its ID.
   * 
   * @param id - Document ID
   * @returns The requested document
   * @throws Exception if the document is not found
   */
  @Get(':id')
  @Roles(Role.ADMIN, Role.EDITOR) // Only Admins and Editors can fetch individual documents
  async getDocument(@Param('id') id: string) {
    try {
      return await this.documentService.getDocument(id);
    } catch (error) {
      handleException(error);
    }
  }

  /**
   * Delete a document by its ID.
   * 
   * @param id - Document ID to delete
   * @returns Success message or error if deletion fails
   * @throws Exception if the document cannot be deleted
   */
  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR) // Only Admins and Editors can delete documents
  async deleteDocument(@Param('id') id: string) {
    try {
      return await this.documentService.deleteDocument(id);
    } catch (error) {
      handleException(error);
    }
  }
}
