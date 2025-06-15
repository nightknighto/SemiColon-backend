import passport from "passport";
import { Strategy as JWTStrategy, StrategyOptions, VerifyCallback, ExtractJwt } from "passport-jwt";
import { dbGetUserById, dbGetUserByPhone } from "../models/user/user.model";
import configs from "../config/config";
import UserType from "../types/user";
import { Request } from "express";

declare global {
	namespace Express {
		interface User extends UserType {}
	}
}

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];   // <-- change 'jwt' to your cookie name
  }
  return token;
};

const options: StrategyOptions = {
	// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	secretOrKey: configs.SESSION_SECRET,
	ignoreExpiration: false,
	algorithms: ["HS256"],
};

const JWTVerify: VerifyCallback = async (payload, done) => {
	let user: UserType;
	try {
		user = await dbGetUserById(payload.sub);
		return done(null, user);
	} catch (error: unknown) {
		return done(error);
	}
};

passport.use(new JWTStrategy(options, JWTVerify));
