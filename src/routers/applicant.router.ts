import { Router } from 'express'
import {
    addNewApplicant,
    getAllApplicants,
    updateApplicantById,
} from '../controllers/applicant.controller'

const applicantRouter = Router()

applicantRouter.get('/', getAllApplicants)
applicantRouter.post('/', addNewApplicant)
applicantRouter.patch('/:id', updateApplicantById)
applicantRouter.get('/:id', updateApplicantById)

export default applicantRouter
