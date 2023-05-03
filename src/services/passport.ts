import passport from 'passport';
import {
	IVerifyOptions,
	Strategy as LocalStrategy,
	VerifyFunction,
} from 'passport-local';

import { dbGetUserById, dbGetUserByPhone } from '../models/user/user.model';
import { verifyPassword } from '../utils/authentication/password.utils';
import userType from '../types/user.d';

declare global {
	namespace Express {
		interface User extends userType {}
	}
}

const localVerify: VerifyFunction = async (
	phone: string,
	password: string,
	done: (
		error: any,
		user?: Express.User | false,
		options?: IVerifyOptions
	) => void
) => {
	try {
		// validation done in a middleware
		const user = await dbGetUserByPhone(phone);
		if (!user) {
			// user not found
			return done(null, false);
		}
		const validPassword = await verifyPassword(password, user.password);
		if (!validPassword) {
			// password is not valid
			return done(null, false);
		}
		// user found and password is valid
		return done(null, user);
	} catch (error: unknown) {
		done(error);
	}
};

passport.use(
	new LocalStrategy(
		{ usernameField: 'phone', passwordField: 'password' },
		localVerify
	)
);

passport.serializeUser((user: Express.User, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await dbGetUserById(id);
		done(null, user);
	} catch (error: unknown) {
		done(error);
	}
});
