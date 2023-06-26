import mongoose from "mongoose";
import {
    participant as ParticipantType,
    UpdateParticipant,
} from "../../types/participant";
import Participant from "./participant.schema";
import ErrorWithStatusCode from "../../utils/classes/ErrorWithStatusCode";

export async function dbGetAllParticipants() {
    const participants = await Participant.find().populate({
        path: 'InterviewerNote.interviewerId',
        select: '_id phone username role' 
      });
    if (!participants) {
        throw new ErrorWithStatusCode(
            "Error while getting all participants",
            500
        );
    }
    return participants;
}

export async function dbAddParticipant(participant: Partial<ParticipantType>) {
    const newParticipant = new Participant(participant);
    if (!newParticipant) {
        throw new ErrorWithStatusCode("Error while adding participant", 500);
    }

    return await newParticipant.save();
}

export async function dbDeleteParticipant(filter: UpdateParticipant) {
    const deletedParticipant = await Participant.findOneAndDelete(filter);
    if (!deletedParticipant) {
        throw new ErrorWithStatusCode("Participant doesn't exist", 404);
    }
    return deletedParticipant;
}

export async function dbUpsertParticipant(participant: ParticipantType) {
    let filter = { phone: participant.phone };
    let update = participant;
    const newParticipant = await Participant.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
    });
    if (!newParticipant) {
        throw new ErrorWithStatusCode("Error while upserting participant", 500);
    }
    return newParticipant;
}

export async function dbUpdateParticipant(
    update: Partial<ParticipantType>,
    filter: UpdateParticipant
) {
    const updatedParticipant = await Participant.findOneAndUpdate(
        filter,
        update,
        { new: true, runValidators: true }
    );
    if (!updatedParticipant) {
        throw new ErrorWithStatusCode("participant does not exist", 404);
    }
    return updatedParticipant;
}
