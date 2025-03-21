import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

