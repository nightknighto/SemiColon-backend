import { Router } from "express";
import participantRouter from "./participant.router";

const globalRouter = Router();

globalRouter.use("/participants", participantRouter);
export default globalRouter;
