import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';

/**
 * `RolesGuard` is a role-based access control (RBAC) guard.
 * It restricts access to routes based on user roles defined in metadata.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Determines whether the request should be granted access based on user roles.
   *
   * @param {ExecutionContext} context - The execution context containing request details.
   * @returns {boolean} - Returns `true` if the user has a required role, otherwise throws an exception.
   * @throws {ForbiddenException} - If the user lacks the necessary role or is unauthorized.
   */
  canActivate(context: ExecutionContext): boolean {
    // Retrieve the roles metadata assigned to the route handler
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // If no roles are required, allow access by default
    if (!requiredRoles) {
      return true;
    }

    // Get the request object and user details
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    // Ensure the user exists and has a role assigned
    if (!user || !user.role) {
      throw new ForbiddenException('User role not found');
    }

    // Check if the user's role matches one of the required roles
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied: Insufficient permissions');
    }

    return true; // Grant access if the role is valid
  }
}
