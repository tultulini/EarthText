import { isNullOrUndefined } from "./object"

export const stringify = (obj) => {
    if (isNullOrUndefined(obj)) {
        return obj
    }
    return JSON.stringify(obj, null, '\t')
}