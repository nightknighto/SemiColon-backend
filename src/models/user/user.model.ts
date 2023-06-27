import mongoose from "mongoose";
import UserType from "../../types/user";
import { hashPassword } from "../../utils/authentication/password.utils";
import ErrorWithStatusCode from "../../utils/classes/ErrorWithStatusCode";
import User from "./user.schema";

export async function dbGetUserById(id: string) {
	const result = await User.findById(id);
	if (!result) {
		throw new ErrorWithStatusCode("User not found", 404);
	}
	return result;
}

export async function dbGetAllUsers() {
	return await User.find();
}

export async function dbGetUserByPhone(phone: string) {
	const result = await User.findOne({ phone });
	if (!result) {
		throw new ErrorWithStatusCode("User not found", 404);
	}
	return result;
}

export async function dbAddNewUser(user: UserType, session?: mongoose.ClientSession) {
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
		return await userToAdd.save({ session});
	} catch (error: any) {
		if ((error.code = 11000)) {
			throw new ErrorWithStatusCode(error.message, 400);
		}
		throw error;
	}
}

export async function dbUpdateUserById(id: string, user: Partial<UserType>, session?: mongoose.ClientSession) {
	const result = await User.findByIdAndUpdate(id, user, { session });
	if (!result) {
		throw new ErrorWithStatusCode("User not found", 404);
	}
	return result;
}

export async function dbDeleteUserById(id: string, session?: mongoose.ClientSession) {
	const result = await User.findByIdAndDelete(id, { session });
	if (!result) {
		throw new ErrorWithStatusCode("User not found", 404);
	}
	return result;
}

export async function dbActivateUserById(id: string, session?: mongoose.ClientSession) {
	const result = await User.findByIdAndUpdate(id, { active: true }, { new: true, session });
	if (!result) {
		throw new ErrorWithStatusCode("User not found", 404);
	}
	return result;
}

export async function dbDeactivateUserById(id: string, session?: mongoose.ClientSession) {
	const result = await User.findByIdAndUpdate(id, { active: false }, { new: true, session });
	if (!result) {
		throw new ErrorWithStatusCode("User not found", 404);
	}
	return result;
}

// ⚠️ ⚠️ ⚠️ Dangerous function, only for testing purposes ⚠️ ⚠️ ⚠️
export async function dbDeleteAllUsers() {
	return await User.deleteMany({});
}
