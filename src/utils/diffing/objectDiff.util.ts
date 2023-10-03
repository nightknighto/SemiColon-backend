import { Document } from 'mongoose'

export function diffObjects<T>(oldObj: T, newObj: T) {
    if (oldObj instanceof Document) {
        oldObj = oldObj.toObject()
        newObj = (newObj as Document).toObject()
    }
    let OLD = {} as Partial<T>
    let NEW = {} as Partial<T>
    for (const key in newObj) {
        if (oldObj[key] !== newObj[key]) {
            NEW[key] = newObj[key]
            OLD[key] = oldObj[key]
        }
    }
    const diff = {
        NEW,
        OLD,
    }

    return diff
}
