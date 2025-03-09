import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
      if (!requiredRoles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
      const user = request.user;
  
      if (!user || !user.role) {
        throw new ForbiddenException('User role not found');
      }
  
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('Access denied: Insufficient permissions');
      }
  
      return true;
    }
  }
  