import { Router } from "express";
import { Login, Register } from "../controllers/auth.controller";
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

authRouter.post(
	"/register",
	(req, res, next) => {
		/**
		 * #swagger.tags = ['Auth']
		 * #swagger.description = 'Endpoint to authenticate All logins login'
		 */
		next();
	},
	mwValidateUserData,
	Register
);

export default authRouter;
