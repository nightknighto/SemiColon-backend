import { Types } from 'mongoose'

export default function validateId(
    id: string | Types.ObjectId | undefined,
): void | never {
    if (!id) {
        throw new Error('id field is required')
    } else if (!Types.ObjectId.isValid(id)) {
        throw new Error('id field is invalid')
    }
}
