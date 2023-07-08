import { Router } from "express";
import { Login } from "../controllers/auth.controller";
import { mwValidateLoginData, mwValidateUserData } from "../middlewares/userDataValidator";
const authRouter = Router();

authRouter.post(
	"/login",
	(req, res, next) => {
		/**
		 * #swagger.tags = ['Auth']
		 * #swagger.description = 'Endpoint to authenticate All logins login'
		 */
		next();
	},
	mwValidateLoginData,
	Login
);

export default authRouter;
