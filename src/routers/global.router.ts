import {Router} from 'express';
import participantRouter from './participant.router';

const globalRouter = Router();

// HANDLE ALL ROUTES
globalRouter.use('/participants', participantRouter);
export default globalRouter;