import { 
  BadRequestException, 
  Injectable, 
  NotFoundException, 
  UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';
import { handleException } from '../../utils/exception-handler.util';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, 
    private prisma: PrismaService, 
    private userService: UserService
  ) {}

  /**
   * Validates the provided password against the hashed password stored in the database.
   * 
   * @param password - The plain text password entered by the user.
   * @param dbPassword - The hashed password stored in the database.
   * @returns A boolean indicating whether the password matches.
   */
  async validateUser(password: string, dbPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, dbPassword);
  }

  /**
   * Generates a JWT token for authentication.
   * 
   * @param payload - The payload data to include in the token (e.g., user ID, email, role).
   * @returns A signed JWT token.
   */
  generateToken(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Use environment variables for security
      expiresIn: '1d', // Token expiration duration
    });
  }

  /**
   * Handles user authentication (sign-in).
   * 
   * @param signInDto - Contains user credentials (email and password).
   * @returns The authenticated user object along with a JWT token.
   * @throws NotFoundException if the user is not found.
   * @throws BadRequestException if the password is incorrect.
   */
  async SignInUser(signInDto: SignInDto): Promise<any> {
    try {
      // Find the user by email
      const user = await this.userService.findByEmail(signInDto?.email);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      console.log(user, "user"); // Debugging log

      // Validate user password
      const valid = await this.validateUser(signInDto?.password, user?.password);
      if (valid) {
        const payload = {
          sub: user?.id,
          email: user?.email,
          role: user?.role, // Include role in the token payload
        };

        // Remove sensitive data before sending response
        delete user.createdAt;
        delete user.password;

        // Generate JWT token
        const accessToken = this.generateToken(payload);

        return {
          user: user,
          token: accessToken,
        };
      } else {
        throw new BadRequestException("Invalid Password!");
      }
    } catch (error) {
      handleException(error);
    }
  }

  /**
   * Handles user registration (sign-up).
   * 
   * @param user - The user registration data (email, password, etc.).
   * @returns The newly created user object.
   * @throws Exception if registration fails.
   */
  async SignUp(user: SignUpDto) {
    try {
      const saltRounds = 10;

      // Hash the user's password before storing it
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Save user to database
      const userData = await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword, // Store hashed password
        },
      });

      return userData;
    } catch (error) {
      handleException(error);
    }
  }
}
