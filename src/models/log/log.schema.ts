import mongoose from 'mongoose'
import { UserLogType, ParticipantLogType } from '../../types/log'
const ParticipantLogSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        required: false,
    },
    action: {
        type: String,
        required: true,
        enum: ['add', 'update', 'delete', 'approve', 'reject'],
    },
    previousState: {
        type: Object,
    },
    newState: {
        type: Object,
    },
})

const UserLogSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    action: {
        type: String,
        required: true,
        enum: ['add', 'update', 'delete', 'activate', 'deactivate'],
    },
    previousState: {
        type: Object,
    },
    newState: {
        type: Object,
    },
})

export const UserLog = mongoose.model<UserLogType>('UserLog', UserLogSchema)
export const ParticipantLog = mongoose.model<ParticipantLogType>(
    'ParticipantLog',
    ParticipantLogSchema,
)
