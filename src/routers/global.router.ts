import {Router} from 'express';

import userRouter from './user.router';

const globalRouter = Router();

// HANDLE ALL ROUTES
globalRouter.use('/user', userRouter)

export default globalRouter;