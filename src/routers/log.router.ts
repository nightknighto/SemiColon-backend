import { Router } from 'express';
import {
	getAllLogs,
	getLogsByAdminId,
	getLogsByParticipantId,
} from '../controllers/log.controller';
import isAdmin from '../middlewares/authentication/admin.middleware';
import isLoggedIn from '../middlewares/authentication/login.middleware';

const logRouter = Router();

logRouter.get('/', isLoggedIn, isAdmin, getAllLogs);
logRouter.get('/admin/:phone', isLoggedIn, isAdmin, getLogsByAdminId);
logRouter.get('/participant/:id', isLoggedIn, isAdmin, getLogsByParticipantId);

export default logRouter;
