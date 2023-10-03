import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import UserType from '../../types/user'
import configs from '../../config/config'

export function issueToken(user: UserType) {
    const payload = {
        sub: user._id,
    }
    const secret = String(configs.SESSION_SECRET)
    const signOptions: SignOptions = {
        algorithm: 'HS256',
        expiresIn: '7d',
    }
    const token = jwt.sign(payload, secret, signOptions)
    return token
}
