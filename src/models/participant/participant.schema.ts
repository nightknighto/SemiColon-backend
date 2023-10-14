import mongoose, { Schema } from 'mongoose'
import { participant as ParticipantType } from '../../types/participant'
import { CriteriaEnum, InterviewerObject } from '../../types/interviewNote'
export enum PreferencesEnum {
    C_PROG = 'c-prog',
    AVR = 'avr',
    ARM = 'arm',
    FULLSTACK = 'fullstack',
    FRONTEND = 'frontend',
    REACT = 'react',
    NODEJS = 'nodejs',
    PYTHON = 'python',
    DIGITAL_DESIGN = 'digital',
    FLUTTER = 'flutter',
    DESKTOP = 'desktop',
}

export enum StatusEnum {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    PENDING = 'pending',
    EMAILED = 'emailed',
    FILTERED = 'filtered',
    SCHEDULED = 'scheduled',
    SECONDPREF = 'secondpref',
}

// TODO:: participant last updated status
// TODO:: populate interviewerId

function createInterviewerNoteSchema(criteria: string[]) {
    const criteriaSchema: any = {}
    for (const criterion of criteria) {
        criteriaSchema[criterion] = {
            type: {
                rating: {
                    type: Number,
                    enum: [1, 2, 3, 4, 5],
                    required: true,
                },
                note: {
                    type: String,
                    trim: true,
                },
            },
            required: false,
        }
    }
    const interviewerObjectSchema = {
        interviewNotes: criteriaSchema,
        interviewerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
    return new mongoose.Schema<InterviewerObject>(interviewerObjectSchema)
}

export const interviewerNotesSchema = createInterviewerNoteSchema(
    Object.values(CriteriaEnum),
)

export const participantSchema = new mongoose.Schema<ParticipantType>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            match: /^01\d{9}$/,
            trim: true,
        },
        firstPreference: {
            type: String,
            required: true,
            enum: Object.values(PreferencesEnum),
        },
        secondPreference: {
            type: String,
            enum: Object.values(PreferencesEnum),
        },
        firstPrefReason: {
            type: String,
            trim: true,
        },
        firstPrefKnowledge: {
            type: String,
            required: true,
            trim: true,
        },
        secondPrefReason: {
            type: String,
            trim: true,
        },
        pastExperience: {
            type: String,
            trim: true,
        },
        collegeId: {
            type: String,
            trim: true,
        },
        year: {
            type: String,
            required: true,
            enum: ['Freshman', 'Sophomore', 'Junior', 'Senior 1', 'Senior 2'],
        },
        acceptanceStatus: {
            type: String,
            required: true,
            default: StatusEnum.PENDING,
            enum: Object.values(StatusEnum),
        },
        InterviewerNote: {
            type: interviewerNotesSchema,
            requiredPaths: ['interviewNotes', 'interviewerId', 'date'],
            trim: true,
        },
    },
    { timestamps: true },
)

const Participant = mongoose.model<ParticipantType>(
    'Participant',
    participantSchema,
)

export default Participant
