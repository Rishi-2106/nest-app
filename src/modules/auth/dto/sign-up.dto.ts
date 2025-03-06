import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

