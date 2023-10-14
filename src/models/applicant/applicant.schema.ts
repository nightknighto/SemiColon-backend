import mongoose from 'mongoose'
import {
    ApplicantType,
    DepartmentEnum,
    AcademicYearsEnum,
} from '../../types/applicant'
import { StatusEnum } from '../participant/participant.schema'
import { interviewerNotesSchema } from '../participant/participant.schema'

const applicantSchema = new mongoose.Schema<ApplicantType>(
    {
        name: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            enum: DepartmentEnum,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        academic_year: {
            type: String,
            enum: AcademicYearsEnum,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            match: /^01\d{9}$/,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        first_preference: {
            type: String,
            required: true,
        },
        first_preference_reason: {
            type: String,
            required: true,
        },
        second_preference: {
            type: String,
            required: true,
        },
        second_preference_reason: {
            type: String,
            required: true,
        },
        previousExperience: {
            type: String,
            required: true,
        },
        acceptanceStatus: {
            type: String,
            required: true,
            default: StatusEnum.PENDING,
            enum: StatusEnum,
        },
        InterviewerNote: {
            type: interviewerNotesSchema,
            requiredPaths: ['interviewNotes', 'interviewerId', 'date'],
            trim: true,
        },
    },
    { timestamps: true },
)

export const Applicant = mongoose.model('Applicant', applicantSchema)
