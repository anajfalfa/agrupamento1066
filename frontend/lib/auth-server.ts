import { hash, compare } from 'bcryptjs';

// Password utilities - ONLY FOR SERVER USE
export async function hashPassword(password: string) {
    return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
}
