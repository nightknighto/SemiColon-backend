import { userSchema } from '../models/user/user.schema'
import { Mongoose } from 'mongoose'

export enum CommitteeEnum {
    WEB_ADVANCED = 'web-advanced',
    WEB_BASIC = 'embedded',
    AVR = 'avr',
    ARM = 'arm',
    EMBEDDED_C = 'embedded-c',
    PYTHON = 'python',
}
export default interface UserType {
    _id?: Mongoose.Types.ObjectId
    username: string
    password: string
    phone: string
    committee: CommitteeEnum
    role: string
    active?: boolean
}
