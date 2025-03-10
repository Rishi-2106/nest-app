import { Role } from 'src/enums/role.enum';
import { JwtService } from '@nestjs/jwt'; // Importing JwtService from NestJS

/**
 * Decodes the role and user information from the JWT token in the request header.
 *
 * @param {any} req - The incoming HTTP request object.
 * @param {JwtService} jwtService - The JWT service used for decoding the token.
 * @returns An object containing the user's role, ID, and name (or email).
 * @throws Will throw an error if the authorization header or token is missing, or if decoding fails.
 */
export function DecodeRole(req: any, jwtService: JwtService) {
  // Extract the Authorization header
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    throw new Error('Authorization header is missing'); // Throw an error if no authorization header is present
  }

  // Extract the JWT token from the Authorization header (format: "Bearer <token>")
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token is missing'); // Throw an error if the token is missing
  }

  // Decode the JWT token to extract user details
  const decoded = jwtService.decode(token) as {
    role: Role;
    sub: string;
    name: string;
    email: string;
  };

  if (!decoded) {
    throw new Error('Failed to decode token'); // Throw an error if decoding fails
  }

  // Return extracted user information
  return {
    role: decoded?.role, // Extracted user role
    id: decoded?.sub, // Extracted user ID (subject of the token)
    name: decoded?.name || decoded?.email, // Extracted user name or email if name is not available
  };
}