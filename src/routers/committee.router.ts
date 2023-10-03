import { Router } from 'express'
import {
    deleteCommitteeByTitle,
    getAllCommittees,
    getCommitteeByTitle,
    updateCommitteeByTitle,
    addNewCommittee,
} from '../controllers/committee.controller'

const committeeRouter = Router()

committeeRouter.post('/', addNewCommittee)
committeeRouter.get('/', getAllCommittees)
committeeRouter.get('/:title', getCommitteeByTitle)
committeeRouter.patch('/', updateCommitteeByTitle)
committeeRouter.delete('/:title', deleteCommitteeByTitle)

export default committeeRouter
