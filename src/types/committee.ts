import { Types } from 'mongoose'

export enum CommitteeEnum {
    advanced_web = 'Advanced Web',
    basic_web = 'Basic Web',
    avr = 'Avr',
    arm = 'Arm',
    embedded_c = 'Embedded C',
    python = 'Python',
}

export enum SectorEnum {
    web = 'Web Development',
    embedded = 'Embedded Systems',
    software_engineering = 'Software Engineering',
    operational = 'Operational',
    other = 'Other',
}

export interface CommitteeType {
    _id?: Types.ObjectId
    title: string
    description: string
    image: string
    brief: string
    heads: string[]
    director: string
    vice_director: string
    sector: SectorEnum
}
