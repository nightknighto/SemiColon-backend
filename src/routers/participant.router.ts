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
} from "../controllers/participant.controller";
import { mwValidateParticipant } from "../middlewares/participants/participant.validation.middleware";
import isLoggedIn from "../middlewares/authentication/login.middleware";
import giveAccessTo from "../middlewares/authentication/giveAccessTo.middleware";

const participantRouter = Router();

participantRouter.get(
    "/getAll",
    getAllParticipants
);
participantRouter.post("/add", mwValidateParticipant, addParticipant);
participantRouter.patch(
    "/update",
    updateParticipantByPhone
);
participantRouter.delete(
    "/delete",
    deleteParticipantByPhone
);
participantRouter.post(
    "/accept",
    acceptParticipantByPhone
);
participantRouter.post(
    "/reject",
    rejectParticipantByPhone
);
participantRouter.post(
    "/email",
    emailParticipantByPhone
);
export default participantRouter;
