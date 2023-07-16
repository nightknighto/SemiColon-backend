import mongoose from "mongoose";
import { Timeslot } from "../../types/timeslots";
import ErrorWithStatusCode from "../../utils/classes/ErrorWithStatusCode";
import { PreferencesEnum } from "../participant/participant.schema";
import TimeSlot from "./timeslots.schema";

export async function dbGetAllTimeSlots(): Promise<Timeslot[]> {
    const timeslots = await TimeSlot.find({}).populate({
        path: "interviewer",
        select: "_id phone username role active",
    }).populate({
        path: "reservedBy",
        select: "_id phone firstPreference "
    });
    if (!timeslots) {
        throw new ErrorWithStatusCode("No Time Slots found", 404);
    }
    return timeslots as Timeslot[];
}

export async function dbGetTimeSlotsByInterviewerId(
    id: string
): Promise<Timeslot[]> {
    const timeslots = await TimeSlot.find({ interviewer: id }).populate({
        path: "interviewer",
        select: "_id phone username role active",
    });
    if (!timeslots) {
        throw new ErrorWithStatusCode("No time slots found", 404);
    }
    return timeslots as Timeslot[];
}

export async function dbGetTimeSlotsByParticipantId(
    id: string
): Promise<Timeslot[]> {
    const timeslots = await TimeSlot.find({ reservedBy: id }).populate({
        path: "interviewer",
        select: "_id phone username role active",
    });
    if (!timeslots) {
        throw new ErrorWithStatusCode("No time slots found", 404);
    }
    return timeslots as Timeslot[];
}

export async function dbGetTimeSlotById(id: string): Promise<Timeslot> {
    const timeslots = await TimeSlot.findById(id).populate({
        path: "interviewer",
        select: "_id phone username role active",
    });
    if (!timeslots) {
        throw new ErrorWithStatusCode("No time slot found", 404);
    }
    return timeslots as Timeslot;
}

export async function dbGetTimeSlotsByTrack(
    track: PreferencesEnum
): Promise<Timeslot[]> {
    const timeslots = await TimeSlot.find({ track: track }).populate({
        path: "interviewer",
        select: "_id phone username role active",
    });
    if (!timeslots) {
        throw new ErrorWithStatusCode("No time slots found", 404);
    }
    return timeslots as Timeslot[];
}

export async function dbAddTimeSlot(
    timeslot: Partial<Timeslot>
): Promise<Timeslot> {
    const newTimeSlot = new TimeSlot(timeslot);
    if (!newTimeSlot) {
        throw new ErrorWithStatusCode("Error while adding time slot", 404);
    }
    return await newTimeSlot.save();
}

export async function dbUpdateTimeSlot(update: Partial<Timeslot>, filter: Partial<Timeslot>){
    const updatedTimeSlot = await TimeSlot.findOneAndUpdate(filter, update, {new: true});
    if (!updatedTimeSlot) {
        throw new ErrorWithStatusCode("Time Slot doesn't exist", 404);
    }
    return updatedTimeSlot;
}
