import { Types } from 'mongoose'
import validateMongoId from '../../utils/data-validation/mongoId.validator'

describe('test validate mongoId', () => {
    test('mongoId is not provided', () => {
        expect(() => validateMongoId(undefined)).toThrowError(
            'id field is required',
        )
    })

    test('mongoId is invalid', () => {
        expect(() => validateMongoId('123')).toThrowError('id field is invalid')
    })

    test('mongoId is valid', () => {
        expect(() => validateMongoId(new Types.ObjectId())).not.toThrowError()
    })
})
