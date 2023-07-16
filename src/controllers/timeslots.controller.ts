import { Request, Response } from "express";
import { dbGetParticipantByPhone } from "../models/participant/participant.model";
import {
    dbAddTimeSlot,
    dbGetAllTimeSlots,
    dbUpdateTimeSlot,
} from "../models/timeslots/timeslots.model";
import { TimeSlotDTO, TimeSlotReserveDTO } from "../types/timeslots";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";

import { Types, Error as MongooseError } from "mongoose";

export async function setTimeSlot(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Time Slots']
     * #swagger.description = 'Endpoint to set a time slot'
     */
    const timeSlotData: TimeSlotDTO = req.body;
    const additionalData = {
        interviewer: req.user?._id,
    };
    try {
        const timeSlot = await dbAddTimeSlot({
            ...timeSlotData,
            ...additionalData,
        });
        res.status(200).json({
            status: "success",
            data: timeSlot,
        });
    } catch (error: unknown) {
        res.status(500 || (error as ErrorWithStatusCode).statusCode).json({
            status: "failure",
            data: (error as Error).message,
        });
    }
}

export async function getAllTimeSlots(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Time Slots']
     * #swagger.description = 'Endpoint to get all time slots'
     */
    try {
        const timeSlots = await dbGetAllTimeSlots();
        res.status(200).json({
            status: "success",
            data: timeSlots,
        });
    } catch (error: unknown) {
        res.status(500 || (error as ErrorWithStatusCode).statusCode).json({
            status: "failure",
            data: (error as Error).message,
        });
    }
}

export async function reserveTimeSlot(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Time Slots']
     * #swagger.description = 'Endpoint to reserve a time slot'
     */
    const reservationData: TimeSlotReserveDTO = req.body;
    try {
        const participant = await dbGetParticipantByPhone(
            reservationData.participantPhoneNumber
        );
        const filter = {
            _id: new Types.ObjectId(reservationData.timeSlotId),
        };
        const update = {
            reservedBy: participant?._id,
        };
        const timeSlot = await dbUpdateTimeSlot(update, filter);
        res.status(200).json({
            status: "success",
            data: timeSlot,
        });
    } catch (error: unknown) {
        res.status(500 || (error as ErrorWithStatusCode).statusCode).json({
            status: "failure",
            data: (error as Error).message,
        });
    }
}
