import { Router } from "express";
import {
  getAllLogs,
  getLogsByAdminId,
  getLogsByAdminPhone,
  getLogsByParticipantId,
} from "../controllers/log.controller";
import isLoggedIn from "../middlewares/authentication/login.middleware";
import giveAccessTo from "../middlewares/authentication/giveAccessTo.middleware";

const logRouter = Router();

logRouter.get("/", isLoggedIn, giveAccessTo("admin"), getAllLogs);
logRouter.get(
  "/admin/:phone",
  isLoggedIn,
  giveAccessTo("admin"),
  getLogsByAdminPhone
);
logRouter.get(
  "/participant/:id",
  isLoggedIn,
  giveAccessTo("admin"),
  getLogsByParticipantId
);

export default logRouter;
