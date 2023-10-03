import UserType from '../../types/user'

export default function validateUser(user: unknown): void | never {
    if (!user) throw new Error('user is not provided')
    validateUsername((user as UserType).username)
    validatePhone((user as UserType).phone)
    validateRole((user as UserType).role)
    validatePassword((user as UserType).password)
    validateActive((user as UserType).active)
}

export function validatePhone(phone: unknown): void | never {
    if (!phone) {
        throw new Error('phone is required')
    } else if (typeof phone !== 'string') {
        throw new Error('phone field is invalid (must be string)')
    } else if (!phone.match(/^01\d{9}$/)) {
        throw new Error(
            'phone is invalid (must be 11 digits and starts with 01)',
        )
    }
}

export function validateUsername(username: unknown) {
    if (!username) {
        throw new Error('username is required')
    } else if (typeof username !== 'string') {
        throw new Error('username field is invalid (must be string)')
    }
}

export function validateRole(role: unknown) {
    if (!role) {
        throw new Error('role is required')
    } else if (typeof role !== 'string') {
        throw new Error('role field is invalid (must be string)')
    } else if (!['admin', 'hr', 'member'].includes(role)) {
        throw new Error('role is invalid, must be one of [admin, hr, member]')
    }
}

export function validatePassword(password: unknown) {
    if (!password) {
        throw new Error('password is required')
    } else if (typeof password !== 'string') {
        throw new Error('password field is invalid (must be string)')
    }
}

export function validateActive(active: unknown) {
    if (active && typeof active !== 'boolean') {
        throw new Error('active field is invalid (must be boolean)')
    }
}
