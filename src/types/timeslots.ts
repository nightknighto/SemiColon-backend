import { PreferencesEnum } from "../models/participant/participant.schema";
import { Types } from "mongoose";
export interface Timeslot {
    _id: Types.ObjectId;
    interviewer: Types.ObjectId;
    startTime: Date;
    endTime: Date;
    reservedBy: Types.ObjectId;
    track: PreferencesEnum;
}

export interface TimeSlotDTO {
    startTime: Date;
    endTime: Date;
    track: PreferencesEnum;
}

export interface TimeSlotReserveDTO {
    timeSlotId: string;
    participantPhoneNumber: string;
}

export enum TimeSlotAction {
    SET = "set",
    RESERVE = "reserve",
}
