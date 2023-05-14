import { Router } from 'express';
import {
	getAllLogs,
	getLogsByAdminId,
	getLogsByAdminPhone,
	getLogsByParticipantId,
} from '../controllers/log.controller';
import isLoggedIn from '../middlewares/authentication/login.middleware';
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware';

const logRouter = Router();

logRouter.get('/', getAllLogs);
logRouter.get('/admin/:phone', getLogsByAdminPhone);
logRouter.get('/participant/:id', getLogsByParticipantId);

export default logRouter;
