import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import UserType from '../../types/user'

// Obtained by trying not in docs
type Info = {
    name: string
    message: string
}

export default function (req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
        'jwt',
        { session: false, failureMessage: true },
        (err: any, user: UserType, info: Info) => {
            if (
                info?.message === 'JsonWebTokenError' ||
                info?.message === 'jwt malformed' ||
                !user
            ) {
                return res.status(401).json({
                    status: 'failure',
                    data: 'invalid or expired token, you need to login again.',
                })
            } else if (info?.message === 'No auth token') {
                return res.status(401).json({
                    status: 'failure',
                    data: 'no auth token provided, you need to provide auth token in Authorization header.',
                })
            } else {
                req.user = user
                next()
            }
        },
    )(req, res, next)
}
