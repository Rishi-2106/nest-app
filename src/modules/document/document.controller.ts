import { Body, Controller, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDto } from './dto/upload-document.dto';
import { handleException } from 'src/utils/exception-handler.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('document')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}


    @Post('/upload')
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File, @Body() documentData: UploadDto) {
      try {
        return await this.documentService.saveFile(documentData,file);
      } catch (error) {
        handleException(error);
      }
    }
  
    @Put(':id')
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async updateDocument(@UploadedFile() file: Express.Multer.File, @Body() documentData: UploadDto,  @Param('id') userId: string,) {
      try {
        return await this.documentService.saveFile(documentData,file);
      } catch (error) {
        handleException(error);
      }
    }

    // @Get(':id')
    // async GetDocument(
    //     @Query("id") id :string,
    // ) {
    //   try {
    //     return await this.documentService.saveFile(documentData);
    //   } catch (error) {
    //     handleException(error);
    //   }
    // }

    // @Put(':id')
    // async registert(@Body() user: SignUpDto) {
    //   try {
    //     return await this.authService.SignUp(user);
    //   } catch (error) {
    //     handleException(error);
    //   }
    // }

}
