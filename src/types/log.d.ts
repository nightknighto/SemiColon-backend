import mongoose from 'mongoose'
import UserType from './user'
import { participant } from './participant'

export interface UserLogType {
    _id?: mongoose.Schema.Types.ObjectId
    initiator: string
    target: string
    action: string
    previousState?: Partial<participant | UserType>
    newState?: Partial<participant | UserType>
}
export interface ParticipantLogType {
    _id?: mongoose.Schema.Types.ObjectId
    initiator: string
    target: string
    action: string
    previousState?: Partial<participant>
    newState?: Partial<participant>
}
