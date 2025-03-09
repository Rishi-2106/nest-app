import { SetMetadata } from '@nestjs/common';

/**
 * Roles decorator for specifying required roles on route handlers
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
