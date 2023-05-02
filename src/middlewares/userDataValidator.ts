import { Request, Response } from 'express';
import validateId from '../utils/data-validation/mongoId.validator';
import validateUser, {
	validatePhone,
} from '../utils/data-validation/user.validator';

export function mwValidateUserData(req: Request, res: Response, next: Function) {
	try {
		const user = req.body;
		validateUser(user); // throws error if invalid
		next();
	} catch (error: any) {
		res.status(400).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export function mwValidateId(req: Request, res: Response, next: Function) {
	try {
		const { id } = req.params;
		validateId(id); // throws error if invalid
		next();
	} catch (error: any) {
		res.status(400).json({
			status: 'failure',
			data: error.message,
		});
	}
}

export function mwValidatePhone(req: Request, res: Response, next: Function) {
	try {
		const { phone } = req.params;
		validatePhone(phone); // throws error if invalid
		next();
	} catch (error: any) {
		res.status(400).json({
			status: 'failure',
			data: error.message,
		});
	}
}
