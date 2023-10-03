import mongoose from 'mongoose'
import { CommitteeEnum } from '../../types/committee'

const committeeSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: Object.values(CommitteeEnum),
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
})

export const Committee = mongoose.model('Committee', committeeSchema)
