import { Router } from 'express'
import { getAllTimeSlots, reserveTimeSlot, setTimeSlot } from '../controllers/timeslots.controller';
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware';
import isLoggedIn from "../middlewares/authentication/login.middleware";
import { mwValidateTimeSlotDTO } from '../middlewares/timeSlots.validator.middleware';
import { TimeSlotAction } from '../types/timeslots';

const timeSlotRouter = Router();

timeSlotRouter.post('/setSlot', mwValidateTimeSlotDTO(TimeSlotAction.SET) , isLoggedIn, giveAccessTo("hr"), setTimeSlot)
.get('/getAllTimeslots', getAllTimeSlots)
.post('/reserveSlot', mwValidateTimeSlotDTO(TimeSlotAction.RESERVE), reserveTimeSlot)
.post('/cancelSlot')


export default timeSlotRouter;