import {Router} from 'express';
import { getAllLogs, getLogsByAdminId, getLogsByParticipantId } from '../controllers/log.controller';

const logRouter = Router();

logRouter.get('/', getAllLogs);
logRouter.get('/admin/:id', getLogsByAdminId);
logRouter.get('/participant/:id', getLogsByParticipantId)

export default logRouter;