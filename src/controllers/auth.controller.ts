import { Request, Response } from "express";
import { dbAddNewUser, dbGetUserById, dbGetUserByPhone } from "../models/user/user.model";
import UserType from "../types/user";
import { verifyPassword } from "../utils/authentication/password.utils";
import { issueToken } from "../utils/authentication/jwt";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";

export async function Login(req: Request, res: Response) {
	const { phone, password } = req.body;
	try {
		const user: UserType = await dbGetUserByPhone(phone);
		if (!user) {
			return res.status(401).json({
				status: "failure",
				data: "Incorrect phone number",
			});
		}
		const valid = await verifyPassword(password, user.password);
		if (!valid) {
			return res.status(401).json({
				status: "failure",
				data: "Incorrect password",
			});
		}
		const token = `Bearer ${issueToken(user)}`;
		return res.status(200).json({
			status: "success",
			data: { token, username: user.username, role: user.role },
		});
	} catch (err: unknown) {
		return res.status((err as ErrorWithStatusCode).statusCode).json({
			status: "failure",
			data: (err as Error).message,
		});
	}
}

export async function Register(req: Request, res: Response) {
	const user = req.body;
	try {
		const newUser = await dbAddNewUser(user);
		const token = `Bearer ${issueToken(newUser)}`;
		res.status(201).json({
			status: "success",
			data: { token, username: user.username, role: user.role },
		});
	} catch (error: unknown) {
		res.status((error as ErrorWithStatusCode).statusCode || 500).json({
			status: "failure",
			data: (error as Error).message,
		});
	}
}
