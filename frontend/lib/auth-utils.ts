/**
 * Shared authentication and role utilities.
 * This file is safe to import in both client and server components
 * as long as it doesn't import database clients or server-only libs like bcrypt.
 */

// Role checking functions
export function isScout(user: any): boolean {
    return user.role === 'SCOUT';
}

export function isSectionLeader(user: any): boolean {
    return user.role === 'SECTION_LEADER';
}

export function isGroupLeader(user: any): boolean {
    return user.role === 'GROUP_LEADER';
}

export function isSuperAdmin(user: any): boolean {
    return user.role === 'SUPER_ADMIN';
}

export function isLeader(user: any): boolean {
    return user.role !== 'SCOUT' && user.role !== undefined;
}

export function isAdmin(user: any): boolean {
    return user.role === 'SUPER_ADMIN' || user.role === 'GROUP_LEADER';
}

export function canAssignScoutNumbers(user: any): boolean {
    return isLeader(user);
}

export function canManageSection(user: any, section: string): boolean {
    if (user.role === 'SUPER_ADMIN' || user.role === 'GROUP_LEADER') return true;
    if (user.role === 'SECTION_LEADER' && user.managedSection === section) return true;
    return false;
}

export function canManageAllSections(user: any): boolean {
    return user.role === 'GROUP_LEADER' || user.role === 'SUPER_ADMIN';
}

export function canChangeRoles(user: any): boolean {
    return user.role === 'GROUP_LEADER' || user.role === 'SUPER_ADMIN';
}

export function canApproveRequests(user: any): boolean {
    return isLeader(user);
}

// Display helpers using string literals to avoid Enum issues if they occur
export function getRoleDisplayName(role: string): string {
    const roleNames: { [key: string]: string } = {
        'SCOUT': 'Escuteiro',
        'SECTION_LEADER': 'Chefe de Secção',
        'GROUP_LEADER': 'Chefe de Agrupamento',
        'SUPER_ADMIN': 'Super Admin',
    };
    return roleNames[role] || role;
}

export function getSectionDisplayName(section: string): string {
    const sectionNames: { [key: string]: string } = {
        'LOBITOS': 'Lobitos',
        'EXPLORADORES': 'Exploradores',
        'PIONEIROS': 'Pioneiros',
        'CAMINHEIROS': 'Caminheiros',
    };
    return sectionNames[section] || section;
}

export function getSectionColor(section: string): string {
    const colors: { [key: string]: string } = {
        'LOBITOS': '#ffe066',
        'EXPLORADORES': '#006738',
        'PIONEIROS': '#00599c',
        'CAMINHEIROS': '#e4022d',
    };
    return colors[section] || '#000000';
}
