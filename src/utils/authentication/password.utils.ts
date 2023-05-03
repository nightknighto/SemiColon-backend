import bcrypt from 'bcrypt';

const SALT_ROUND = 15; // recommended

export async function hashPassword(plainTextPassword: string) {
	return await bcrypt.hash(plainTextPassword, SALT_ROUND);
}

export async function verifyPassword(
	plainTextPassword: string,
	passwordHash: string
) {
	return await bcrypt.compare(plainTextPassword, passwordHash);
}
