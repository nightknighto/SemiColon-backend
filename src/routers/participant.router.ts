import { Router } from "express";
import {
  addParticipant,
  deleteParticipantByEmail,
  getAllParticipants,
  updateParticipant,
} from "../controllers/participant.controller";
import { mwValidateParticipant } from "../middlewares/participants/participant.validation.middleware";

const participantRouter = Router();

// TODO: Authorize these routes for admin only
participantRouter.get("/getAll", getAllParticipants);
participantRouter.post("/add", mwValidateParticipant, addParticipant);
participantRouter.patch("/update", updateParticipant);
participantRouter.delete("/delete", deleteParticipantByEmail);

export default participantRouter;
