import { Router } from "express";
import passport from "passport";
import { failedLogin, successfulLogin } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failure",
  }),
  () => {
    /**
     * #swagger.tags = ['Auth']
     * #swagger.description = 'Endpoint to authenticate All logins login'
     */
  }
);

authRouter.route("/login/success").get(successfulLogin).post(successfulLogin);

authRouter.route("/login/failure").get(failedLogin).post(failedLogin);

export default authRouter;
