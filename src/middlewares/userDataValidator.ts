import { Request, Response } from 'express'
import validateId from '../utils/data-validation/mongoId.validator'
import validateUser, {
    validatePassword,
    validatePhone,
} from '../utils/data-validation/user.validator'

export function mwValidateUserData(
    req: Request,
    res: Response,
    next: Function,
) {
    try {
        const user = req.body
        validateUser(user) // throws error if invalid
        next()
    } catch (error: unknown) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export function mwValidateId(req: Request, res: Response, next: Function) {
    try {
        const { id } = req.params
        validateId(id) // throws error if invalid
        next()
    } catch (error: unknown) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export function mwValidatePhone(req: Request, res: Response, next: Function) {
    try {
        const { phone } = req.params
        validatePhone(phone) // throws error if invalid
        next()
    } catch (error: unknown) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}

export function mwValidateLoginData(
    req: Request,
    res: Response,
    next: Function,
) {
    try {
        const { phone, password } = req.body
        validatePhone(phone) // throws error if invalid
        validatePassword(password) // throws error if invalid
        next()
    } catch (error: unknown) {
        res.status(400).json({
            status: 'failure',
            data: (error as Error).message,
        })
    }
}
