import { Router } from "express";
import {
    acceptParticipantByPhone,
    addParticipant,
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

participantRouter.get(
    "/getAll",
    isLoggedIn,
    giveAccessTo("member"),
    getAllParticipants
);
participantRouter.post("/add", mwValidateParticipant, addParticipant);
participantRouter.patch(
    "/update",
    isLoggedIn,
    giveAccessTo("hr"),
    updateParticipantByPhone
);
participantRouter.delete(
    "/delete",
    isLoggedIn,
    giveAccessTo("admin"),
    deleteParticipantByPhone
);
participantRouter.post( //reduntant
    "/accept",
    isLoggedIn,
    giveAccessTo("admin"),
    acceptParticipantByPhone
);
participantRouter.post( //reduntant
    "/reject",
    isLoggedIn,
    giveAccessTo("admin"),
    rejectParticipantByPhone
);
participantRouter.post( //reduntant
    "/email",
    isLoggedIn,
    giveAccessTo("admin"),
    emailParticipantByPhone
);
participantRouter.patch(
    "/status",
    isLoggedIn,
    giveAccessTo("hr"),
    mwValidateStatus,
    updateParticipantStatus
)
export default participantRouter;
