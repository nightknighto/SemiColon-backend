import { Router } from 'express'
import {
    addNewApplicant,
    getAllApplicants,
    getApplicantById,
    updateApplicantById,
    addNoteToApplicant,
} from '../controllers/applicant.controller'
import isLoggedIn from '../middlewares/authentication/login.middleware'
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware'

const applicantRouter = Router()

applicantRouter.get('/', isLoggedIn, getAllApplicants)
applicantRouter.get('/:id', isLoggedIn, getApplicantById)
applicantRouter.post('/', addNewApplicant)
applicantRouter.patch(
    '/:id',
    isLoggedIn,
    giveAccessTo('hr'),
    updateApplicantById,
)
applicantRouter.patch(
    '/interview/note',
    isLoggedIn,
    giveAccessTo('hr'),
    addNoteToApplicant,
)

export default applicantRouter
