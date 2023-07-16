import { NextFunction } from "express";
import mongoose, { Error, MongooseError, Schema } from "mongoose";
import { Timeslot } from "../../types/timeslots";
import { PreferencesEnum } from "../participant/participant.schema";

export const TimeSlotSchema = new mongoose.Schema<Timeslot>({
    interviewer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    reservedBy: {
        type: Schema.Types.ObjectId,
        ref: "Participant",
        required: false,
    },
    track: {
        type: String,
        required: true,
        enum: Object.values(PreferencesEnum),
    },
});

TimeSlotSchema.index({ startTime: 1, interviewer: 1 }, { unique: true });

const TimeSlot = mongoose.model<Timeslot>("TimeSlot", TimeSlotSchema);

export default TimeSlot;
