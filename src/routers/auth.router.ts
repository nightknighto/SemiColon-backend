import { Router } from "express";
import { Login, Logout } from "../controllers/auth.controller";
import {
  mwValidateLoginData,
  mwValidateUserData,
} from "../middlewares/userDataValidator";
import { signInLimiter } from "../middlewares/rate-limiter";
const authRouter = Router();

authRouter.post(
  "/login",
  signInLimiter,
  (req, res, next) => {
    /**
     * #swagger.tags = ['Auth']
     * #swagger.description = 'Endpoint to authenticate All logins'
     */

    /* #swagger.requestBody = {
			content: {
				"application/json": {
					schema: {$ref: "#/definitions/LoginData"}
				}
			}
		}*/
    next();
  },
  mwValidateLoginData,
  Login
);

authRouter.get('/logout', Logout);

export default authRouter;
