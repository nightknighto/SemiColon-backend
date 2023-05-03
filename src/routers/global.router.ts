import { Router } from "express";
import participantRouter from "./participant.router";

import userRouter from './user.router';

const globalRouter = Router();

globalRouter.use("/participants", participantRouter);
// HANDLE ALL ROUTES
globalRouter.use('/user', userRouter)

export default globalRouter;
