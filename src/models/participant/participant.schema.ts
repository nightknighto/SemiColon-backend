import mongoose from "mongoose";
import { participant as ParticipantType  } from "../../types/participant";
import { criteria, InterviewerNote } from "../../types/interviewer";

export enum PreferencesEnum {
    C_PROG = "c-prog",
    AVR = "avr",
    ARM = "arm",
    FULLSTACK = "fullstack",
    FRONTEND = "frontend",
    REACT = "react",
    NODEJS = "nodejs",
    PYTHON = "python",
    DIGITAL_DESIGN = "digital",
    FLUTTER = "flutter",
    DESKTOP = "desktop"
}
function createInterviewerNoteSchema(criteria: string[]) {
    const schema: any = {};
    for (const criterion of criteria) {
        schema[criterion] = {
            rating: {
                type: Number,
                enum: [1, 2, 3, 4, 5],
                required: true
            },
            note: {
                type: String,
                required: true
            }
        };
    }
    return new mongoose.Schema(schema);
}
const InterviewerNoteSchema = createInterviewerNoteSchema(Object.values(criteria));

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
            required: true,
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
            enum: ["Freshman", "Sophomore", "Junior", "Senior 1", "Senior 2"],
        },
        acceptanceStatus: {
            type: String,
            required: true,
            default: "pending",
            enum: ["pending", "accepted", "rejected", "emailed",  "scheduled", "secondPreference"],
        },
        InterviewerNote: {
            type: InterviewerNoteSchema,
            trim: true,
        }
    },
    { timestamps: true }
);

const Participant = mongoose.model<ParticipantType>(
    "Participant",
    participantSchema
);

export default Participant;
