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
    dbUpdateUser,
} from "../models/participant/participant.model";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";
import { dbAddNewLog } from "../models/log/log.model";
import { sendBulkEmail, sendMail } from "../services/node-mailer";
import mailGen from "../utils/constructors/email.constructors";
import { email } from "../types/email";
// import { Preference } from "../models/participant/participant.schema";
import { StatusEnum } from "../models/participant/participant.schema";


async function waitMail(ms: number) {
    return new Promise((resolve) => {
        resolve(setTimeout(() => {}, ms));
    });
}

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
        const updatedParticipant = await dbUpdateUser(update, { phone });
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






// function filterByPreferences(preferences: Preference[], participants: ParticipantType[]){
//    return participants.filter(participant => preferences.includes(participant.firstPreference));
// }

export async function bulkEmailParticipants(req: Request, res: Response) {
    const { type, preferences } = req.body;
    try {
        //TODO:: filter by preference
        // TODO::  fix up the type here
        let EmailType = type as "initial" | "interview";
        let participants = (await dbGetAllParticipants()) as ParticipantType[];
        // TODO:: add a type for preferences
        if (preferences) {
            participants = participants.filter((participant) =>
                preferences.includes(participant.firstPreference)
            );
        }
        let emails: email[] = [];
        emails = mailGen[EmailType](participants);
        if (emails.length === 0 || !emails) {
            res.status(400).json({
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
        res.status(500).json({
            status: "failure",
            data: (error as Error).message,
        });
    }
}

export async function addParticipantNotes(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to add notes to a participant'
     */
    try {
        const { phone, notes }: { phone: string; notes: InterviewerNote } =
            req.body;
        let strNote = JSON.stringify(notes);
        const updatedParticipant = await dbUpdateUser(
            { InterviewerNote: strNote },
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

export async function acceptParticipantByPhone(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Participants']
   * #swagger.description = 'Endpoint to get accept a participant from database'
   */
  try {
    const { phone }: { phone: string } = req.body;
    const updatedParticipant = await dbUpdateUser(
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
    const updatedParticipant = await dbUpdateUser(
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
    const updatedParticipant = await dbUpdateUser(
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

export async function updateParticipantStatus(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Participants']
   * #swagger.description = 'Endpoint to update a participant's status'
   */
  try {
    const { status, phone }: { status: StatusEnum, phone: string } = req.body;
    const updatedParticipant = await dbUpdateUser(
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
