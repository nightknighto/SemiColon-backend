import { Types } from 'mongoose'


export enum SectorEnum {
    web = 'Web Development Sector',
    embedded = 'Embedded Systems Sector',
    software_engineering = 'Software Engineering Sector',
    operational = 'Operational Sector',
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
