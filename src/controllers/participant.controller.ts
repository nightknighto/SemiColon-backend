import { Request, Response } from "express";
import { InterviewerNote, participant as ParticipantType } from "../types/participant";

import {
  dbGetAllParticipants,
  dbAddParticipant,
  dbUpsertParticipant,
  dbDeleteParticipant,
  dbUpdateUser,
} from "../models/participant/participant.model";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";
import { dbAddNewLog } from "../models/log/log.model";
import { sendMail } from "../services/node-mailer";

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

function filterByPreferences(preferences: string[], participants: ParticipantType[]){
   return participants.filter(participant => preferences.includes(participant.firstPreference));
}


export async function bulkEmailParticipants(req: Request, res: Response) {
  /**
   * #swagger.tags = ['Participants']
   * #swagger.description = 'Endpoint to get send an email to all participants from database'
   */
  try {
    const participants = await dbGetAllParticipants();
    let filteredParticipants = participants.filter(participant => participant.firstPreference !== "digital");
    //filteredParticipants.forEach(async (participant: ParticipantType) => {
      // TODO:: Filteration by prefefrence 
      // TODO:: 

    for (const participant of filteredParticipants) {
      if(participant.acceptanceStatus !== "emailed"){
        let extenstion = "";
        if(participant.firstPreference === "c-prog"){
          extenstion = `<p>The C/Embedded C workshop will start at the beginning of July.</p>`
        }else if(participant.firstPreference === "fullstack"){
          extenstion = `<p>The Full-stack workshop will start at the beginning of July.</p>`
        }else{
          extenstion = `<p>The ${participant.firstPreference} workshop will start at the beginning of August.</p>`
        }
        const emailBody: string =`<html><p>Dear Applicant,</p><div style='width:50%'><p>We would like to extend our appreciation for your interest in applying to Semicolon workshops Program.We are glad to inform you that after reviewing your application, you have passed the filtration phase with the pool of selected applicants who fit our workshop criteria. You will receive another email soon to schedule an interview within the next week.</p>${extenstion}<p>Best wishes,<br>SemiColon team</p></div></html>`
        await sendMail(participant.email, "SemiColon Workshops", emailBody);
        await waitMail(5000)
        console.log("email sent to ", participant.email)
        await dbUpdateUser({ acceptanceStatus: "emailed" }, { phone: participant.phone });
        console.log("updated participant ", participant.email)
      }
    };
    res.status(200).json({ status: "success"});
  } catch (error: ErrorWithStatusCode | any) {
    res.status(error.statusCode || 500).json({
      status: "failure",
      data: error.message,
    });
  }
}

export async function addParticipantNotes(req: Request, res: Response){
  /**
   * #swagger.tags = ['Participants']
   * #swagger.description = 'Endpoint to add notes to a participant'
   */
  try {
    const { phone, notes }: { phone: string, notes: InterviewerNote } = req.body;
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