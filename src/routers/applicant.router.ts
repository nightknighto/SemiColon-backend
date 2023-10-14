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

applicantRouter.get('/', getAllApplicants)
applicantRouter.get('/:id', getApplicantById)
applicantRouter.post('/', addNewApplicant)
applicantRouter.patch('/:id', updateApplicantById)
applicantRouter.patch('/interview/note', isLoggedIn, addNoteToApplicant)

export default applicantRouter
