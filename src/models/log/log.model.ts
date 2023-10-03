import mongoose from 'mongoose'
import { UserLogType, ParticipantLogType } from '../../types/log'
import { UserLog, ParticipantLog } from './log.schema'

export async function dbAddNewUserLog(
    log: UserLogType,
    session?: mongoose.ClientSession,
) {
    await UserLog.create([log], { session })
}

export async function dbAddNewParticipantLog(
    log: ParticipantLogType,
    session?: mongoose.ClientSession,
) {
    await ParticipantLog.create([log], { session })
}

export async function dbGetAllParticipantLogs(
    session?: mongoose.ClientSession,
) {
    return await ParticipantLog.find({}, {}, { session })
        .populate('initiator')
        .populate('target')
}

export async function dbGetAllUserLogs(session?: mongoose.ClientSession) {
    return await UserLog.find({}, {}, { session })
        .populate('initiator')
        .populate('target')
}

export async function dbGetLogsByAdminId(
    adminId: string,
    session?: mongoose.ClientSession,
) {
    const userLogs = await UserLog.find({ initiatorId: adminId })
        .populate('initiator')
        .populate('target')
    const participantLogs = await ParticipantLog.find(
        { initiatorId: adminId },
        {},
        { session },
    )
        .populate('initiator')
        .populate('target')
    return {
        userLogs: userLogs,
        participantLogs: participantLogs,
    }
}

export async function dbGetLogsByAdminPhone(
    adminPhone: string,
    session?: mongoose.ClientSession,
) {
    const userLogs = await UserLog.find({ initiatorPhone: adminPhone })
        .populate('initiator')
        .populate('target')
    const participantLogs = await ParticipantLog.find(
        { initiatorPhone: adminPhone },
        {},
        { session },
    )
        .populate('initiator')
        .populate('target')
    return {
        userLogs: userLogs,
        participantLogs: participantLogs,
    }
}

export async function dbGetLogsByParticipantId(
    participantId: string,
    session?: mongoose.ClientSession,
) {
    return await ParticipantLog.find(
        { targetId: participantId },
        {},
        { session },
    )
        .populate('initiator')
        .populate('target')
}
