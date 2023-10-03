import { Document } from 'mongoose'

export function getChanges<T>(update: Partial<T>, original: T) {
    if (original instanceof Document) {
        original = original.toObject()
    }
    const OLD = {} as Partial<T>
    const NEW = {} as Partial<T>
    for (const key in update) {
        if (update[key] !== original[key]) {
            NEW[key] = update[key]
            OLD[key] = original[key]
        }
    }
    const changes = { OLD, NEW }
    return changes
}
