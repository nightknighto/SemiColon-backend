export default function validateUser(user: any): void | never {
	if (!user) throw new Error('user is not provided');
	validateUsername(user.username);
	validatePhone(user.phone);
	validateRole(user.role);
	validatePassword(user.password);
	validateActive(user.active);
}

export function validatePhone(phone: any): void | never {
	if (!phone) {
		throw new Error('phone is required');
	} else if (typeof phone !== 'string') {
		throw new Error('phone field is invalid (must be string)');
	} else if (!phone.match(/^01\d{9}$/)) {
		throw new Error(
			'phone is invalid (must be 11 digits and starts with 01)'
		);
	}
}

export function validateUsername(username: any) {
	if (!username) {
		throw new Error('username is required');
	} else if (typeof username !== 'string') {
		throw new Error('username field is invalid (must be string)');
	}
}

export function validateRole(role: any) {
	if (!role) {
		throw new Error('role is required');
	} else if (typeof role !== 'string') {
		throw new Error('role field is invalid (must be string)');
	} else if (!['admin', 'hr', 'member'].includes(role)) {
		throw new Error('role is invalid, must be one of [admin, hr, member]');
	}
}

export function validatePassword(password: any) {
	if (password && typeof password !== 'string') {
		throw new Error('password field is invalid (must be string)');
	}
}

export function validateActive(active: any) {
	if (active && typeof active !== 'boolean') {
		throw new Error('active field is invalid (must be boolean)');
	}
}
