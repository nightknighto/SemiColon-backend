import { TimeSlotAction, TimeSlotDTO, TimeSlotReserveDTO } from "../../types/timeslots";
import { ValidatePhone, ValidatePreference } from "./participant.validation";
import { ObjectId, Types } from "mongoose";
import ErrorWithStatusCode from "../classes/ErrorWithStatusCode";

export function validateDate(date: Date): boolean {
    // const theDate = new Date(Date.parse(date));
    // TODO:: remove this is for postman 
    date = new Date(date);
    if (!date) {
        throw new ErrorWithStatusCode("Date is required", 400);
    } else if (date instanceof Date && !isNaN(date.getTime())) {
        return true;
    } else {
        throw new ErrorWithStatusCode("Invalid Date", 400);
    }
}

export function validatePeriod(startTime: Date, endTime: Date): boolean {
    const currentDate = new Date();
    // For Postman TODO:: Remove
    startTime = new Date(startTime);
    if (startTime >= endTime || startTime.getTime() <= currentDate.getTime() ) {
        throw new ErrorWithStatusCode("Invalid Period", 400);
    }
    return true;
}

export function validateMongoId(id: string): boolean {
    if (!id) {
        throw new ErrorWithStatusCode("MongoId is required", 400);
    } else if (!Types.ObjectId.isValid(id)) {
        throw new ErrorWithStatusCode("Invalid MongoId", 400);
    }
    return true;
}

export function validateTimeSlotSetDTO(timeSlotDTO: TimeSlotDTO): boolean {
    return (
        validateDate(timeSlotDTO.startTime) &&
        validateDate(timeSlotDTO.endTime) &&
        validatePeriod(timeSlotDTO.startTime, timeSlotDTO.endTime) &&
        ValidatePreference(timeSlotDTO.track)
    );
}

export function validateTimeSlotReserveDTO(
    timeSlotReserveDTO: TimeSlotReserveDTO
): boolean {
    return (
        validateMongoId(timeSlotReserveDTO.timeSlotId) &&
        ValidatePhone(timeSlotReserveDTO.participantPhoneNumber)
    );
}

export function validateTimeSlotDTO(action: TimeSlotAction, DTO: TimeSlotDTO | TimeSlotReserveDTO){
    switch (action) {
        case TimeSlotAction.SET:
            return validateTimeSlotSetDTO(DTO as TimeSlotDTO);
        case TimeSlotAction.RESERVE:
            return validateTimeSlotReserveDTO(DTO as TimeSlotReserveDTO);
        default:
            throw new ErrorWithStatusCode("Invalid TimeSlot Action", 400);
    }
}
