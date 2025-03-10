import { Role } from "src/enums/role.enum";

/**
 * Role-based authority mapping.
 * Defines which roles have permission to create other roles.
 *
 * - ADMIN can create EDITOR and VIEWER roles.
 * - EDITOR and VIEWER do not have permission to create any roles.
 */
const RoleAuthorityMap: Record<Role, Role[]> = {
  [Role.ADMIN]: [
    Role.EDITOR,
    Role.VIEWER
  ],
  [Role.EDITOR]: [], // EDITOR cannot create any new roles
  [Role.VIEWER]: []  // VIEWER cannot create any new roles
};

/**
 * Checks if a user with a given role has permission to create another role.
 *
 * @param {Role} userRole - The role of the user attempting to create a new role.
 * @param {Role} targetRole - The role that the user wants to create.
 * @returns {boolean} - Returns `true` if the user has permission to create the target role, otherwise `false`.
 */
export function canCreateRole(userRole: Role, targetRole: Role): boolean {
  const allowedRoles = RoleAuthorityMap[userRole] || []; // Get the list of roles the user can create
  return allowedRoles.includes(targetRole); // Check if the target role is in the allowed list
}
