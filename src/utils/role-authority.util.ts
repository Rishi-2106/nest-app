import { Role } from "src/enums/role.enum";


const RoleAuthorityMap: Record<Role, Role[]> = {
  [Role.ADMIN]: [
    Role.EDITOR,
    Role.VIEWER
  ],
  [Role.EDITOR]: [], // No authority to create any other role
  [Role.VIEWER]: []
};

export function canCreateRole(userRole: Role, targetRole: Role): boolean {
  const allowedRoles = RoleAuthorityMap[userRole] || [];
  return allowedRoles.includes(targetRole);
}
