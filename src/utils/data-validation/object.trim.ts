export function trimObject(obj: any) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].trim()
        } else if (typeof obj[key] === 'object') {
            trimObject(obj[key])
        }
    }
}
