import { Router } from 'express'
import {
    acceptParticipantById,
    addNoteToParticipant,
    addParticipant,
    bulkEmailParticipants,
    deleteParticipantByEmail,
    deleteParticipantById,
    emailParticipantByPhone,
    getAllParticipants,
    rejectParticipantByPhone,
    updateParticipantById,
    updateParticipantStatus,
} from '../controllers/participant.controller'
import {
    mwValidateParticipant,
    mwValidateStatus,
} from '../middlewares/participants/participant.validation.middleware'
import isLoggedIn from '../middlewares/authentication/login.middleware'
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware'
import { applyLimiter } from '../middlewares/rate-limiter'

const participantRouter = Router()

participantRouter
    .get('/getAll', isLoggedIn, giveAccessTo('member'), getAllParticipants)
    .post('/add', applyLimiter, mwValidateParticipant, addParticipant)
    .patch('/update', isLoggedIn, giveAccessTo('hr'), updateParticipantById)
    .delete('/delete', isLoggedIn, giveAccessTo('admin'), deleteParticipantById)
    .post('/email', isLoggedIn, giveAccessTo('admin'), bulkEmailParticipants)
    .patch(
        '/interview/note',
        isLoggedIn,
        giveAccessTo('hr'),
        addNoteToParticipant,
    )
    .patch(
        '/status',
        isLoggedIn,
        giveAccessTo('hr'),
        mwValidateStatus,
        updateParticipantStatus,
    )
export default participantRouter
