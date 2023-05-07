import { Router } from 'express';
import {
	addParticipant,
	deleteParticipantByEmail,
	getAllParticipants,
	updateParticipant,
} from '../controllers/participant.controller';
import { mwValidateParticipant } from '../middlewares/participants/participant.validation.middleware';
import isLoggedIn from '../middlewares/authentication/login.middleware';
import isAdmin from '../middlewares/authentication/admin.middleware';

const participantRouter = Router();

// TODO: Authorize these routes for admin only
participantRouter.get('/getAll', isLoggedIn, isAdmin, getAllParticipants);
participantRouter.post('/add', mwValidateParticipant, addParticipant);
participantRouter.patch('/update', isLoggedIn, isAdmin, updateParticipant);
participantRouter.delete(
	'/delete',
	isLoggedIn,
	isAdmin,
	deleteParticipantByEmail
);

export default participantRouter;
