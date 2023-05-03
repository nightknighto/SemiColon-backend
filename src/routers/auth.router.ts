import { Router, Request, Response } from 'express';
import passport from 'passport';
const authRouter = Router();

authRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/auth/login/success',
		failureRedirect: '/auth/login/failure',
	})
);

authRouter.post('/login/success', (req: Request, res: Response) => {
	console.log(req.session?.cookie)
	res.status(200).json({ status: 'success', data: 'Successful login' });
});

authRouter.post('/login/failure', (req: Request, res: Response) => {
	res.status(401).json({
		status: 'failure',
		data: 'Invalid phone number or password',
	});
});

export default authRouter;
