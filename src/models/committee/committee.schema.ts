import mongoose from 'mongoose'
import { CommitteeEnum, CommitteeType, SectorEnum } from '../../types/committee'

const committeeSchema = new mongoose.Schema<CommitteeType>({
    title: {
        type: String,
        enum: CommitteeEnum,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brief: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        enum: SectorEnum,
        required: true,
    },
    heads: {
        type: [String],
        required: true,
    },
    director: String,
    vice_director: String,
})

export const Committee = mongoose.model('Committee', committeeSchema)
