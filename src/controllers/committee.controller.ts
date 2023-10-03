import { Request, Response } from 'express'
import {
    dbAddNewCommittee,
    dbDeleteCommitteeByTitle,
    dbGetAllCommittees,
    dbGetCommitteeByTitle,
    dbUpdateCommitteeByTitle,
    getCommitteeMembersByCommitteeId,
} from '../models/committee/committee.model'

export async function addNewCommittee(req: Request, res: Response) {
    try {
        const newCommittee = await dbAddNewCommittee(req.body)
        res.status(201).json({ status: 'success', data: newCommittee })
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function getAllCommittees(req: Request, res: Response) {
    try {
        const committees = await dbGetAllCommittees()
        res.status(200).json({ status: 'success', data: committees })
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function getCommitteeByTitle(req: Request, res: Response) {
    try {
        const committee = await dbGetCommitteeByTitle(req.params.title)
        const committeeMembers = await getCommitteeMembersByCommitteeId(
            String(committee?._id),
        )
        const formattedCommittee = {
            ...committee,
            members: committeeMembers,
        }
        res.status(200).json({ status: 'success', data: formattedCommittee })
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function deleteCommitteeByTitle(req: Request, res: Response) {
    try {
        const committee = await dbDeleteCommitteeByTitle(req.params.title)
        res.status(200).json({ status: 'success', data: committee })
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function updateCommitteeByTitle(req: Request, res: Response) {
    try {
        const { title, ...update } = req.body
        const committee = await dbUpdateCommitteeByTitle(title, update)
        res.status(200).json({ status: 'success', data: committee })
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}
