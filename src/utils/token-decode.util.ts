import { Role } from 'src/enums/role.enum';
import { JwtService } from '@nestjs/jwt'; // Assuming you're using NestJS

export function DecodeRole(req: any, jwtService: JwtService) {
  const authHeader = req?.headers?.authorization;
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  const token = authHeader.split(' ')[1]; // Extract the token
  if (!token) {
    throw new Error('Token is missing');
  }

  const decoded = jwtService.decode(token) as {
    role: Role;
    sub: string;
    name: string;
    email: string;
  };
  if (!decoded) {
    throw new Error('Failed to decode token');
  }

  return {
    role: decoded?.role,
    id: decoded?.sub,
    name: decoded?.name || decoded?.email,
  };
}
