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
import { PreferencesEnum } from "../models/participant/participant.schema";
// import { Preference } from "../models/participant/participant.schema";

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

export async function acceptParticipantByPhone(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to get accept a participant from database'
     */
    try {
        const { phone }: { phone: string } = req.body;
        const updatedParticipant = await dbUpdateUser(
            { acceptanceStatus: "accepted" },
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
            { acceptanceStatus: "rejected" },
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
            { acceptanceStatus: "emailed" },
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

// function filterByPreferences(preferences: Preference[], participants: ParticipantType[]){
//    return participants.filter(participant => preferences.includes(participant.firstPreference));
// }

export async function bulkEmailParticipants(req: Request, res: Response) {
    const { type, preferences } = req.body;
    try {
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

// export async function bulkEmailParticipants(req: Request, res: Response) {
//     /**
//      * #swagger.tags = ['Participants']
//      * #swagger.description = 'Endpoint to get send an email to all participants from database'
//      */
//     try {
//         let participants = (await dbGetAllParticipants()) as ParticipantType[];

//         for (const participant of participants) {
//             if (
//                 participant.acceptanceStatus !== "scheduled" &&
//                 participant.firstPreference === "c-prog"
//             ) {
//               console.log(participant.name);
//                 // let extenstion = "";
//                 // if(participant.firstPreference === "c-prog"){
//                 //   extenstion = `<p>The C/Embedded C workshop will start at the beginning of July.</p>`
//                 // }else if(participant.firstPreference === "fullstack"){
//                 //   extenstion = `<p>The Full-stack workshop will start at the beginning of July.</p>`
//                 // }else{
//                 //   extenstion = `<p>The ${participant.firstPreference} workshop will start at the beginning of August.</p>`
//                 // }
//                 const emailBody = `<p>Dear ${participant.name},</p><p>We are writing to inform you that the interview schedule for the C/Embedded C workshop is now available.<br> Please find your designated interview time below: <br> <a href="http://bit.ly/semicolon-interviews"> http://bit.ly/semicolon-interviews</a> <br> </p><p>The interviews will be conducted via Google Meet with your camera on. Please ensure that you have a stable internet connection and a quiet environment during the interview.</p><p>Slots will be added every day, so please check back if you do not see a time that is suitable for you. The last day of interviews is June 26, 2023.</p><p>If you have any questions or concerns, you can contact us through our Facebook social page.</p><p>Thank you for your interest in the workshop. We look forward to hearing from you soon.</p><p>Best regards,<br>SemiColon team</p>`;

//                 // const emailBody: string =`<html><p>Dear Applicant,</p><div style='width:50%'><p>We would like to extend our appreciation for your interest in applying to Semicolon workshops Program.We are glad to inform you that after reviewing your application, you have passed the filtration phase with the pool of selected applicants who fit our workshop criteria. You will receive another email soon to schedule an interview within the next week.</p>${extenstion}<p>Best wishes,<br>SemiColon team</p></div></html>`
//                 await sendMail(
//                     participant.email,
//                     "SemiColon Workshops",
//                     emailBody
//                 );
//                 await waitMail(5000);
//                 console.log("email sent to ", participant.email);
//                 await dbUpdateUser(
//                     { acceptanceStatus: "scheduled" },
//                     { phone: participant.phone }
//                 );
//                 console.log("updated participant ", participant.email);
//             }
//         }
//         res.status(200).json({ status: "success" });
//     } catch (error: ErrorWithStatusCode | any) {
//         res.status(error.statusCode || 500).json({
//             status: "failure",
//             data: error.message,
//         });
//     }
// }

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

export async function changeStatusByPhone(req:Request, res:Response){
    /**
     * #swagger.tags = ['Participants']
     * #swagger.description = 'Endpoint to change a participant status by phone number'
     */
    try {
        const { phone, status }: { phone: string; status: PreferencesEnum } = req.body;
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
        res.status(200).json({ status: "success", data: updatedParticipant });
    } catch (error: ErrorWithStatusCode | any) {
        res.status(error.statusCode || 500).json({
            status: "failure",
            data: error.message,
        });
    }
}
