import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';

/**
 * JwtAuthGuard is a custom authentication guard that validates JWT tokens
 * for securing protected routes in the application.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Checks if the request contains a valid JWT token and grants or denies access.
   * 
   * @param {ExecutionContext} context - The execution context containing request details.
   * @returns {boolean} - Returns `true` if the token is valid, otherwise throws an exception.
   * @throws {UnauthorizedException} - If the token is missing, invalid, or expired.
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>(); // Use custom type for strong typing
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing'); // Reject request if no token is provided
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

    try {
      // Verify and decode the token, attaching the decoded user details to the request object
      request.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Ensure the JWT secret is configured properly in environment variables
      });
      return true; // Grant access if the token is valid
    } catch (error) {
      console.log(error); // Log error for debugging purposes
      throw new UnauthorizedException('Invalid or expired token'); // Reject request if the token is invalid or expired
    }
  }
}
