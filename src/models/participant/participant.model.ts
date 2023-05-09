import mongoose from "mongoose";
import { participant as ParticipantType } from "../../types/participant";
import Participant from "./participant.schema";
import ErrorWithStatusCode from "../../utils/classes/ErrorWithStatusCode";

export async function dbGetAllParticipants() {
    const participants = await Participant.find();
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

export async function dbDeleteParticipantByEmail(email: string) {
    let filter = { email: email };
    const deletedParticipant = await Participant.findOneAndDelete(filter);
    if (!deletedParticipant) {
        throw new ErrorWithStatusCode("Participant doesn't exist", 404);
    }
    return deletedParticipant;
}

export async function dbUpsertParticipant(participant: ParticipantType) {
    let filter = { email: participant.email };
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

export async function dbUpdateUserByEmail(
    update: Partial<ParticipantType>,
    email: string
) {
    let filter = { email: email };
    const updatedParticipant = await Participant.updateOne(filter, update);
    if (updatedParticipant.matchedCount === 0) {
        throw new ErrorWithStatusCode("participant does not exist", 404);
    }
    return updatedParticipant;
}
