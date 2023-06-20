import UserType from '../../types/user';
import { hashPassword } from '../../utils/authentication/password.utils';
import ErrorWithStatusCode from '../../utils/classes/ErrorWithStatusCode';
import User from './user.schema';

export async function dbGetUserById(id: string) {
	const result = await User.findById(id);
	if (!result) {
		throw new ErrorWithStatusCode('User not found', 404);
	}
	return result;
}

export async function dbGetAllUsers() {
	return await User.find();
}

export async function dbGetUserByPhone(phone: string) {
	const result = await User.findOne({ phone });
	if (!result) {
		throw new ErrorWithStatusCode('User not found', 404);
	}
	return result;
}

export async function dbAddNewUser(user: UserType) {
	user.password = await hashPassword(user.password); // encrypt password
	const userToAdd = new User(user);

	// Validate user
	try {
		await userToAdd.validate();
	} catch (error: any) {
		throw new ErrorWithStatusCode(error.message, 400);
	}

	// Check for duplication error
	try {
		return await userToAdd.save();
	} catch (error: any) {
		if ((error.code = 11000)) {
			throw new ErrorWithStatusCode(error.message, 400);
		}
		throw error;
	}
}

export async function dbUpdateUserById(id: string, user: UserType) {
	const result = await User.findByIdAndUpdate(id, user);
	if (!result) {
		throw new ErrorWithStatusCode('User not found', 404);
	}
	return result;
}

export async function dbDeleteUserById(id: string) {
	const result = await User.findByIdAndDelete(id);
	if (!result) {
		throw new ErrorWithStatusCode('User not found', 404);
	}
	return result;
}

export async function dbActivateUserById(id: string) {
	const result = await User.findByIdAndUpdate(
		id,
		{ active: true },
		{ new: true }
	);
	if (!result) {
		throw new ErrorWithStatusCode('User not found', 404);
	}
	return result;
}

export async function dbDeactivateUserById(id: string) {
	const result = await User.findByIdAndUpdate(
		id,
		{ active: false },
		{ new: true }
	);
	if (!result) {
		throw new ErrorWithStatusCode('User not found', 404);
	}
	return result;
}

// ⚠️ ⚠️ ⚠️ Dangerous function, only for testing purposes ⚠️ ⚠️ ⚠️
export async function dbDeleteAllUsers() {
	return await User.deleteMany({});
}
