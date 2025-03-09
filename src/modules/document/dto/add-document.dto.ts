import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class DocumentDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

