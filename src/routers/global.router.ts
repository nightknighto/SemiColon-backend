import { Router } from "express";

import participantRouter from "./participant.router";
import userRouter from './user.router';
import authRouter from './auth.router';

const globalRouter = Router();

globalRouter.use("/participants", participantRouter);
// HANDLE ALL ROUTES
globalRouter.use('/user', userRouter);
globalRouter.use('/auth', authRouter);

globalRouter.get("/", (req, res) => {
    res.send("Server Running!");
});

export default globalRouter;
