import validateUser, {
    validateActive,
    validatePassword,
    validatePhone,
    validateRole,
    validateUsername,
} from '../../utils/data-validation/user.validator'

describe('test validate username', () => {
    test('username is required', () => {
        expect(() => validateUsername(undefined)).toThrowError(
            'username is required',
        )
    })

    test('username field is invalid (must be string)', () => {
        expect(() => validateUsername(123)).toThrowError(
            'username field is invalid (must be string)',
        )
    })

    test('username is valid', () => {
        expect(() => validateUsername('username')).not.toThrowError()
    })
})

describe('test validate phone', () => {
    test('phone is required', () => {
        expect(() => validatePhone(undefined)).toThrowError('phone is required')
    })

    test('phone field is invalid (must be string)', () => {
        expect(() => validatePhone(123)).toThrowError(
            'phone field is invalid (must be string)',
        )
    })

    test('phone is invalid (must be 11 digits and starts with 01)', () => {
        expect(() => validatePhone('0123456789')).toThrowError(
            'phone is invalid (must be 11 digits and starts with 01)',
        )
    })

    test('phone is valid', () => {
        expect(() => validatePhone('01234567890')).not.toThrowError()
    })
})

describe('test validate role', () => {
    test('role is required', () => {
        expect(() => validateRole(undefined)).toThrowError('role is required')
    })

    test('role field is invalid (must be string)', () => {
        expect(() => validateRole(123)).toThrowError(
            'role field is invalid (must be string)',
        )
    })

    test('role is invalid, must be one of [admin, hr, member]', () => {
        expect(() => validateRole('invalid')).toThrowError(
            'role is invalid, must be one of [admin, hr, member]',
        )
    })

    test('role is valid', () => {
        expect(() => validateRole('admin')).not.toThrowError()
    })
})

describe('test validate password', () => {
    test('password field is invalid (must be string)', () => {
        expect(() => validatePassword(123)).toThrowError(
            'password field is invalid (must be string)',
        )
    })

    test('password is valid', () => {
        expect(() => validatePassword('password')).not.toThrowError()
    })

    test('password is not provided', () => {
        expect(() => validatePassword(undefined)).toThrowError()
    })
})

describe('test validate active', () => {
    test('active field is invalid (must be boolean)', () => {
        expect(() => validateActive(123)).toThrowError(
            'active field is invalid (must be boolean)',
        )
    })

    test('active is valid', () => {
        expect(() => validateActive(true)).not.toThrowError()
    })

    test('active is not provided', () => {
        expect(() => validateActive(undefined)).not.toThrowError()
    })
})

describe('test validate user', () => {
    test('user is not provided', () => {
        expect(() => validateUser(undefined)).toThrowError(
            'user is not provided',
        )
    })

    test('user is valid', () => {
        expect(() =>
            validateUser({
                username: 'username',
                phone: '01234567890',
                role: 'admin',
                password: 'password',
                active: true,
            }),
        ).not.toThrowError()
    })

    test('user is invalid', () => {
        expect(() =>
            validateUser({
                username: 'username',
                phone: '01234567890',
                role: 'admin',
                password: 'password',
                active: 'invalid',
            }),
        ).toThrowError()
    })
})
