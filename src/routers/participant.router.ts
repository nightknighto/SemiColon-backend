import { Router } from 'express';
import {
	addParticipant,
	deleteParticipantByEmail,
	getAllParticipants,
	updateParticipant,
} from '../controllers/participant.controller';
import { mwValidateParticipant } from '../middlewares/participants/participant.validation.middleware';
import isLoggedIn from '../middlewares/authentication/login.middleware';
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware';

const participantRouter = Router();

participantRouter.get(
	'/getAll',
	isLoggedIn,
	giveAccessTo('hr'),
	getAllParticipants
);
participantRouter.post('/add', mwValidateParticipant, addParticipant);
participantRouter.patch(
	'/update',
	isLoggedIn,
	giveAccessTo('hr'),
	updateParticipant
);
participantRouter.delete(
	'/delete',
	isLoggedIn,
	giveAccessTo('admin'),
	deleteParticipantByEmail
);

export default participantRouter;
