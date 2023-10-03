import passport from 'passport'
import {
    Strategy as JWTStrategy,
    StrategyOptions,
    VerifyCallback,
    ExtractJwt,
} from 'passport-jwt'
import { dbGetUserById, dbGetUserByPhone } from '../models/user/user.model'
import configs from '../config/config'
import UserType from '../types/user'

declare global {
    namespace Express {
        interface User extends UserType {}
    }
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.SESSION_SECRET,
    ignoreExpiration: false,
    algorithms: ['HS256'],
}

const JWTVerify: VerifyCallback = async (payload, done) => {
    let user: UserType
    try {
        user = await dbGetUserById(payload.sub)
        return done(null, user)
    } catch (error: unknown) {
        return done(error)
    }
}

passport.use(new JWTStrategy(options, JWTVerify))
