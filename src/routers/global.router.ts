import { Router } from 'express';

import participantRouter from './participant.router';
import userRouter from './user.router';
import authRouter from './auth.router';
import logRouter from './log.router';

const globalRouter = Router();

// HANDLE ALL ROUTES
globalRouter.use('/user', userRouter);
globalRouter.use('/auth', authRouter);
globalRouter.use('/participants', participantRouter);
globalRouter.use('/log', logRouter);

globalRouter.get("/", (req, res) => {
    res.send("Server Running!");
});

export default globalRouter;
