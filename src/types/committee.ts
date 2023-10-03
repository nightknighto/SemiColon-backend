import mongoose, { Types } from 'mongoose'

export enum CommitteeEnum {
    WEB_ADVANCED = 'Web Advanced',
    WEB_BASIC = 'Web Basic',
    AVR = 'Avr',
    ARM = 'Arm',
    EMBEDDED_C = 'Embedded C',
    PYTHON = 'Python',
}
export interface CommitteeType {
    _id?: Types.ObjectId
    title: string
    description: string
    imageURL: string
}
