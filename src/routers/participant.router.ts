import { Router } from "express";
import {
    addParticipant,
    deleteParticipantByEmail,
    getAllParticipants,
    updateParticipant,
} from "../controllers/participant.controller";

const participantRouter = Router();

participantRouter.get("/getAll", getAllParticipants)
participantRouter.post("/add", addParticipant)
participantRouter.patch("/udpate", updateParticipant)
participantRouter.delete("/delete", deleteParticipantByEmail);

export default participantRouter;
