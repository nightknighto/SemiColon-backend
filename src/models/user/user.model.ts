import UserType from '../../types/user';
import User from './user.schema';

export async function dbGetUserById(id: string) {
	return await User.findById(id);
}

export async function dbGetUserByPhone(phone: string) {
	return await User.findOne({ phone });
}

export async function dbAddNewUser(user: UserType) {
	return await User.create(user);
}

export async function dbUpdateUserById(id: string, user: UserType) {
	return await User.findByIdAndUpdate(id, user);
}

export async function dbDeleteUserById(id: string) {
	return await User.findByIdAndDelete(id);
}

export async function dbActivateUserById(id: string) {
	return await User.findByIdAndUpdate(id, { active: true });
}

export async function dbDeactivateUserById(id: string) {
	return await User.findByIdAndUpdate(id, { active: false });
}
