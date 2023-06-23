import { Request, Response } from "express";
import {
    InterviewerNote,
    participant as ParticipantType,
} from "../types/participant";

import {
  dbGetAllParticipants,
  dbAddParticipant,
  dbUpsertParticipant,
  dbDeleteParticipant,
  dbUpdateParticipant,
} from "../models/participant/participant.model";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";
import { dbAddNewLog } from "../models/log/log.model";
import { sendBulkEmail, sendMail } from "../services/node-mailer";
import mailGen, {
    EmailTypeEnum,
} from "../utils/constructors/email.constructors";
import { Email } from "../types/email";
// import { Preference } from "../models/participant/participant.schema";
import { StatusEnum } from "../models/participant/participant.schema";

//------------------------CRUD------------------------//
export async function getAllParticipants(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get all participants from database'
     */
    try {
        const participants = await dbGetAllParticipants();
        res.status(200).json({ status: "success", data: participants });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export async function addParticipant(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get add a participant to database'
     */
    try {
        const { participant }: { participant: ParticipantType } = req.body;
        const newParticipant = await dbUpsertParticipant(participant);
        res.status(200).json({ status: "success" });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export async function deleteParticipantByEmail(req: Request, res: Response) {
    try {
        const { email } = req.body;
        const deletedParticipant = await dbDeleteParticipant({ email });
        await dbAddNewLog({
            adminPhone: req.user?.phone as string,
            adminId: req.user?._id as string,
            action: "delete",
            participantId: deletedParticipant._id as string,
        });
        res.status(200).json({ status: "success", data: deletedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export async function deleteParticipantByPhone(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get delete a participant from database'
     */
    try {
        const { phone } = req.body;
        const deletedParticipant = await dbDeleteParticipant({ phone });
        await dbAddNewLog({
            adminPhone: req.user?.phone as string,
            adminId: req.user?._id as string,
            action: "delete",
            participantId: deletedParticipant._id as string,
        });
        res.status(200).json({ status: "success", data: deletedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export async function updateParticipantByPhone(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to update a participant in database'
     */
    try {
        const {
            update,
            phone,
        }: { update: Partial<ParticipantType>; phone: string } = req.body;
        const updatedParticipant = await dbUpdateParticipant(update, { phone });
        await dbAddNewLog({
            adminPhone: req.user?.phone as string,
            adminId: req.user?._id as string,
            action: "update",
            participantId: updatedParticipant._id as string,
        });
        res.status(200).json({ status: "success", data: updatedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

//------------------Emails------------------//

export async function bulkEmailParticipants(req: Request, res: Response) {
    const { type, preferences } = req.body;
    try {
        let EmailType = type as EmailTypeEnum;
        let participants = (await dbGetAllParticipants()) as ParticipantType[];
        if (preferences) {
            participants = participants.filter((participant) =>
                preferences.includes(participant.firstPreference)
            );
        }
        let emails: Email[] = mailGen[EmailType](participants);
        if (emails.length === 0 || !emails) {
            return res.status(400).json({
                status: "failure",
                data: "No emails to send",
            });
        }
        await sendBulkEmail(emails);
        res.status(200).json({
            status: "success",
            data: "Emails sent successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failure",
            data: (error as Error).message,
        });
    }
}

export async function acceptParticipantByPhone(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get accept a participant from database'
     */
    try {
        const { phone }: { phone: string } = req.body;
        const updatedParticipant = await dbUpdateParticipant(
            { acceptanceStatus: StatusEnum.ACCEPTED },
            { phone }
        );
        await dbAddNewLog({
            adminPhone: req.user?.phone as string,
            adminId: req.user?._id as string,
            action: "update",
            participantId: updatedParticipant._id as string,
        });
        res.status(200).json({ status: "success", data: updatedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export async function rejectParticipantByPhone(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get reject a participant from database'
     */
    try {
        const { phone }: { phone: string } = req.body;
        const updatedParticipant = await dbUpdateParticipant(
            { acceptanceStatus: StatusEnum.REJECTED },
            { phone }
        );
        await dbAddNewLog({
            adminPhone: req.user?.phone as string,
            adminId: req.user?._id as string,
            action: "update",
            participantId: updatedParticipant._id as string,
        });
        res.status(200).json({ status: "success", data: updatedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

export async function emailParticipantByPhone(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get send an email to a participant from database'
     */
    try {
        const { phone }: { phone: string } = req.body;
        //TODO: send email using nodemailer here
        const updatedParticipant = await dbUpdateParticipant(
            { acceptanceStatus: StatusEnum.EMAILED },
            { phone }
        );
        await dbAddNewLog({
            adminPhone: req.user?.phone as string,
            adminId: req.user?._id as string,
            action: "update",
            participantId: updatedParticipant._id as string,
        });
        res.status(200).json({ status: "success", data: updatedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}

//------------------Status------------------//

export async function updateParticipantStatus(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Participants']
   * #swagger.description = 'Endpoint to update a participant's status'
   */
  try {
    const { status, phone }: { status: StatusEnum, phone: string } = req.body;
    const updatedParticipant = await dbUpdateParticipant(
      { acceptanceStatus: status },
      { phone }
    );
    await dbAddNewLog({
      adminPhone: req.user?.phone as string,
      adminId: req.user?._id as string,
      action: "update",
      participantId: updatedParticipant._id as string,
    });
    res.status(200).json({ status: "success", data: { status: updatedParticipant.acceptanceStatus } });
  } catch (error: ErrorWithStatusCode | any) {
    res.status(error.statusCode || 500).json({
      status: "failure",
      data: error.message,
    });
  }
}
