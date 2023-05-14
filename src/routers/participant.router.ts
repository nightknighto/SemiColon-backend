import { Router } from 'express';
import {
	acceptParticipantByPhone,
	addParticipant,
	deleteParticipantByEmail,
	deleteParticipantByPhone,
	emailParticipantByPhone,
	getAllParticipants,
	rejectParticipantByPhone,
	updateParticipantByPhone,
} from '../controllers/participant.controller';
import { mwValidateParticipant } from '../middlewares/participants/participant.validation.middleware';
import isLoggedIn from '../middlewares/authentication/login.middleware';
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware';

const participantRouter = Router();

participantRouter.get('/getAll', getAllParticipants);
participantRouter.post('/add', mwValidateParticipant, addParticipant);
participantRouter.patch(
	'/update',
	isLoggedIn,
	giveAccessTo('hr'),
	updateParticipantByPhone
);
participantRouter.delete(
	'/delete',
	isLoggedIn,
	giveAccessTo('admin'),
	deleteParticipantByPhone
);
participantRouter.post(
	'/accept',
	isLoggedIn,
	giveAccessTo('admin'),
	acceptParticipantByPhone
);
participantRouter.post(
	'/reject',
	isLoggedIn,
	giveAccessTo('admin'),
	rejectParticipantByPhone
);
participantRouter.post(
	'/email',
	isLoggedIn,
	giveAccessTo('admin'),
	emailParticipantByPhone
);
export default participantRouter;
