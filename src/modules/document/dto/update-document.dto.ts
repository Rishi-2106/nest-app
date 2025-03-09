import {
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  filename: string;

  @IsString()
  @IsOptional()
  ownerId: string;
}

