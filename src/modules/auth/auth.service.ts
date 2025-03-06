import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';
import { handleException } from 'src/utils/exception-handler.util';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService,private userService: UserService,) {}

  async validateUser(password: string, dbPassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, dbPassword);
    return isPasswordValid;
  }

  generateToken(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Specify the secret here
      expiresIn: '1d', // Optional
    });
  }
  async SignInUser(signInDto: SignInDto): Promise<any> {
    try {
      const user = await this.userService.findByEmail(signInDto?.email);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      console.log(user,"user")
      const valid = await this.validateUser(
        signInDto?.password,
        user?.password,
      );
      if (valid) {
        const payload = {
          sub: user?.id,
          email: user?.email,
          role: user?.role, // Include the user's role in the payload
        };
        delete user.createdAt;
        delete user.password;

        // Sign the JWT token with the payload and a secret key
        const accessToken = this.generateToken(payload);
        const response = {
          user: user,
          token: accessToken,
        };
        return response;
      } else {
        throw new BadRequestException("Invalid Password!");
      }
    } catch (error) {
      handleException(error);
    }
  }
  async SignUp(user: SignUpDto) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const userData = await this.prisma.user.create({
        data:{
          ...user,
          password : hashedPassword
        }
      })
      return userData;
    } catch (error) {
      handleException(error);

    }

  }
}
