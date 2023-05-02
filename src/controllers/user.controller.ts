import { Request, Response } from 'express';

import {
	dbAddNewUser,
	dbDeleteUserById,
	dbGetUserById,
	dbGetUserByPhone,
	dbUpdateUserById,
	dbActivateUserById,
	dbDeactivateUserById,
} from '../models/user/user.model';
import validateUser, {
	validatePhone,
} from '../utils/data-validation/user.validator';
import validateId from '../utils/data-validation/mongoId.validator';
import ErrorWithStatusCode from '../utils/classes/ErrorWithStatusCode';

export async function getUserById(req: Request, res: Response) {
	const { id } = req.params;
	try {
		try {
			validateId(id); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const user = await dbGetUserById(id);
		res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function getUserByPhone(req: Request, res: Response) {
	const { phone } = req.params;
	try {
		try {
			validatePhone(phone); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const user = await dbGetUserByPhone(phone);
		res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function addNewUser(req: Request, res: Response) {
	const user = req.body;
	try {
		try {
			validateUser(user); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const newUser = await dbAddNewUser(user);
		res.status(201).json({
			status: 'success',
			data: newUser,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function updateUser(req: Request, res: Response) {
	const { id } = req.params;
	const user = req.body;
	try {
		try {
			validateId(id); // throws error if invalid
			validateUser(user); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const updatedUser = await dbUpdateUserById(id, user);
		res.status(200).json({
			status: 'success',
			data: updatedUser,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function deleteUser(req: Request, res: Response) {
	const { id } = req.params;
	try {
		try {
			validateId(id); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const deletedUser = await dbDeleteUserById(id);
		res.status(200).json({
			status: 'success',
			data: deletedUser,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function activateUser(req: Request, res: Response) {
	const { id } = req.params;
	try {
		try {
			validateId(id); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const activatedUser = await dbActivateUserById(id);
		res.status(200).json({
			status: 'success',
			data: activatedUser,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export async function deactivateUser(req: Request, res: Response) {
	const { id } = req.params;
	try {
		try {
			validateId(id); // throws error if invalid
		} catch (inner: any) {
			throw new ErrorWithStatusCode(inner.message, 400);
		}
		const deactivatedUser = await dbDeactivateUserById(id);
		res.status(200).json({
			status: 'success',
			data: deactivatedUser,
		});
	} catch (error: any) {
		res.status(error.statusCode || 500).json({
			status: 'failure',
			data: error.message,
		});
	}
}
