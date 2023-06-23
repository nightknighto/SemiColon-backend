import { Router } from "express";
import {
    acceptParticipantByPhone,
    addParticipant,
    bulkEmailParticipants,
    deleteParticipantByEmail,
    deleteParticipantByPhone,
    emailParticipantByPhone,
    getAllParticipants,
    rejectParticipantByPhone,
    updateParticipantByPhone,
    updateParticipantStatus,
} from "../controllers/participant.controller";
import { mwValidateParticipant, mwValidateStatus } from "../middlewares/participants/participant.validation.middleware";
import isLoggedIn from "../middlewares/authentication/login.middleware";
import giveAccessTo from "../middlewares/authentication/giveAccessTo.middleware";

const participantRouter = Router();

participantRouter
.get(
    "/getAll",
    isLoggedIn,
    giveAccessTo("member"),
    getAllParticipants
)
.post("/add", mwValidateParticipant, addParticipant)
.patch(
    "/update",
    isLoggedIn,
    giveAccessTo("hr"),
    updateParticipantByPhone
)
.delete(
    "/delete",
    isLoggedIn,
    giveAccessTo("admin"),
    deleteParticipantByPhone
)
.post( //reduntant
    "/accept",
    isLoggedIn,
    giveAccessTo("admin"),
    acceptParticipantByPhone
)
.post( //reduntant
    "/reject",
    isLoggedIn,
    giveAccessTo("admin"),
    rejectParticipantByPhone
)
.post( //reduntant
    "/email",
//    isLoggedIn,
//    giveAccessTo("admin"),
   bulkEmailParticipants
)
// .post(
//     "/interview/note",
//    isLoggedIn,
//    giveAccessTo("hr"),
//    addParticipantNotes
// )
.patch(
    "/status",
    isLoggedIn,
    giveAccessTo("hr"),
    mwValidateStatus,
    updateParticipantStatus
)
export default participantRouter;
