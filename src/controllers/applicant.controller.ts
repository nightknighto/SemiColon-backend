import { Request, Response } from 'express'
import { InterviewerObject } from '../types/interviewNote'
import {
    dbAddNewApplicant,
    dbGetAllApplicants,
    dbGetApplicantById,
    dbUpdateApplicantById,
} from '../models/applicant/applicant.model'

export async function addNewApplicant(req: Request, res: Response) {
    try {
        const newApplicant = await dbAddNewApplicant(req.body)
        res.status(201).json({
            status: 'success',
            data: newApplicant,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function getAllApplicants(req: Request, res: Response) {
    try {
        const applicants = await dbGetAllApplicants()
        res.status(200).json({
            status: 'success',
            data: applicants,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function getApplicantById(req: Request, res: Response) {
    try {
        const applicant = await dbGetApplicantById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: applicant,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function updateApplicantById(req: Request, res: Response) {
    try {
        const updatedApplicant = await dbUpdateApplicantById(
            req.params.id,
            req.body,
        )
        res.status(200).json({
            status: 'success',
            data: updatedApplicant,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export async function addNoteToApplicant(req: Request, res: Response) {
    try {
        const { note, _id } = req.body
        const interviewNoteObj: InterviewerObject = {
            interviewNotes: note,
            interviewerId: req.user?._id,
            date: new Date(),
        }
        const updatedApplicant = await dbUpdateApplicantById(_id, {
            InterviewerNote: interviewNoteObj,
        })
        res.status(200).json({
            status: 'success',
            data: updatedApplicant,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}
