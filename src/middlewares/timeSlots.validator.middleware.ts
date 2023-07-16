import { Request, Response, NextFunction } from "express";
import {
    TimeSlotAction,
    TimeSlotDTO,
    TimeSlotReserveDTO,
} from "../types/timeslots";
import ErrorWithStatusCode from "../utils/classes/ErrorWithStatusCode";
import { validateTimeSlotDTO } from "../utils/data-validation/timeslot.validaiton";

export function mwValidateTimeSlotDTO(timeSlotAction: TimeSlotAction) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const timeSlotDTO: TimeSlotDTO | TimeSlotReserveDTO = req.body;
            validateTimeSlotDTO(timeSlotAction as TimeSlotAction, timeSlotDTO);
            next();
        } catch (error: unknown) {
            res.status(500 || (error as ErrorWithStatusCode).statusCode).json({
                status: "failure",
                data: (error as Error).message,
            });
        }
    };
}
