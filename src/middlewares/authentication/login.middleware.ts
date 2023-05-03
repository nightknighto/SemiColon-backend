import { Request, Response } from 'express';

export default function isLoggedIn(
	req: Request,
	res: Response,
	next: Function
) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({
			status: 'failure',
			data: 'You are not logged in',
		});
	}
}
