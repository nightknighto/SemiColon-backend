import { Router } from 'express'
import {
    addNewApplicant,
    getAllApplicants,
    getApplicantById,
    updateApplicantById,
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

export default applicantRouter
