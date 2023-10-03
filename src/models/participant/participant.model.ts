import {
    participant as ParticipantType,
    UpdateParticipant,
} from '../../types/participant'
import Participant from './participant.schema'
import ErrorWithStatusCode from '../../utils/classes/ErrorWithStatusCode'
import mongoose from 'mongoose'

export async function dbGetAllParticipants(session?: mongoose.ClientSession) {
    const participants = await Participant.find({}, {}, { session }).populate({
        path: 'InterviewerNote.interviewerId',
        select: '_id phone username role',
    })
    if (!participants) {
        throw new ErrorWithStatusCode(
            'Error while getting all participants',
            500,
        )
    }
    return participants
}

export async function dbGetParticipantByPhone(
    phone: string,
    session?: mongoose.ClientSession,
) {
    const participant = Participant.findOne({ phone }, {}, { session })
    if (!participant) {
        throw new ErrorWithStatusCode('Participant not found', 404)
    }
    return participant
}

export async function dbAddParticipant(
    participant: Partial<ParticipantType>,
    session?: mongoose.ClientSession,
) {
    const newParticipant = new Participant(participant)
    if (!newParticipant) {
        throw new ErrorWithStatusCode('Error while adding participant', 500)
    }
    return await newParticipant.save({ session })
}

export async function dbDeleteParticipant(
    filter: UpdateParticipant,
    session?: mongoose.ClientSession,
) {
    const deletedParticipant = await Participant.findOneAndDelete(filter, {
        session,
    })
    if (!deletedParticipant) {
        throw new ErrorWithStatusCode("Participant doesn't exist", 404)
    }
    return deletedParticipant
}

export async function dbUpsertParticipant(
    participant: ParticipantType,
    session?: mongoose.ClientSession,
) {
    let filter = {
        phone: participant.phone,
        firstPreference: participant.firstPreference,
    }
    let update = participant
    const newParticipant = await Participant.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
        session,
    })
    if (!newParticipant) {
        throw new ErrorWithStatusCode('Error while upserting participant', 500)
    }
    return newParticipant
}

export async function dbUpdateParticipant(
    update: Partial<ParticipantType>,
    filter: UpdateParticipant,
    session?: mongoose.ClientSession,
) {
    const updatedParticipant = await Participant.findOneAndUpdate(
        filter,
        update,
        { runValidators: true, session },
    )
    if (!updatedParticipant) {
        throw new ErrorWithStatusCode('participant does not exist', 404)
    }
    return updatedParticipant
}
