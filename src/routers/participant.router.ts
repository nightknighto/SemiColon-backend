import {Router} from 'express';
import { addParticipant, deleteParticipantByEmail, getAllParticipants, updateParticipant } from '../controllers/participant.controller';

const participantRouter = Router();

participantRouter.route('/').get(getAllParticipants).post(addParticipant).patch(updateParticipant).delete(deleteParticipantByEmail);

export default participantRouter;

