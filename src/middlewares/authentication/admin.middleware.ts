import { Request, Response } from 'express';

export default function isAdmin(req: Request, res: Response, next: Function) {
	if (req?.user?.role === 'admin') {
		next();
	} else {
		res.status(401).json({
			status: 'failure',
			data: 'You are not an admin',
		});
	}
}
