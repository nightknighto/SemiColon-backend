import { Response, Request, NextFunction } from 'express';

const permissionLevels = {
	admin: 3,
	hr: 2,
	member: 1,
};

// if the user has a role with a higher permission level than the route requires, then he can access it
export default function giveAccessTo(role: 'admin' | 'hr' | 'member') {
	return (req: Request, res: Response, next: NextFunction) => {
		let userRole = req.user?.role as 'admin' | 'hr' | 'member';
		let isActive = req.user?.active as boolean;
		if (permissionLevels[userRole] >= permissionLevels[role] && isActive) {
			next();
		} else {
			res.status(401).send({
				status: 'failure',
				message: `You must be at least an ** ${role} to access this route`,
			});
		}
	};
}
