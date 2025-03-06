import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  providers: [AuthService , PrismaService, JwtService , UserService],
  controllers: [AuthController]
})
export class AuthModule {}
