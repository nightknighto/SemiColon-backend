import { Request, Response } from 'express'
import {
    dbAddNewUser,
    dbGetUserById,
    dbGetUserByPhone,
} from '../models/user/user.model'
import UserType from '../types/user'
import { verifyPassword } from '../utils/authentication/password.utils'
import { issueToken } from '../utils/authentication/jwt'
import ErrorWithStatusCode from '../utils/classes/ErrorWithStatusCode'

export async function Login(req: Request, res: Response) {
    /*
		#swagger.parameters['loginData'] = {
			in: 'body',
			required: true,
			schema: {$ref: "#/definitions/LoginData"}
		}
	*/
    const { phone, password } = req.body
    let user: UserType = {} as UserType

    try {
        user = await dbGetUserByPhone(phone, true)
    } catch (err: unknown) {
        if ((err as ErrorWithStatusCode).statusCode === 404)
            return res.status(401).json({
                status: 'failure',
                data: 'Incorrect phone number',
            })
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
        return res.status(401).json({
            status: 'failure',
            data: 'Incorrect password',
        })
    }

    /* #swagger.responses[200] = {
			schema: {"$ref": "#/definitions/LoginResponse"},
			description: "User data"
  }*/

    const token = issueToken(user)
    return res.status(200).json({
        status: 'success',
        data: { token, username: user.username, role: user.role },
    })
}
