import { Router } from 'express';

import userRouter from './user.router';
import authRouter from './auth.router';

const globalRouter = Router();

// HANDLE ALL ROUTES
globalRouter.use('/user', userRouter);
globalRouter.use('/auth', authRouter);

export default globalRouter;
