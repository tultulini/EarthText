import { isNullOrUndefined } from "./object"

export const safeLength = (val) => {
    if (isNullOrUndefined(val)) {
        return 0
    }
    if (typeof val !== "string") {
        throw new Error('Value not string')
    }
    return val.length
}

export const firstNonEmptyString = (...all) => {
    if (!all) {
        return null
    }
    for (let arg of all) {
        if (safeLength(arg) > 0) {
            return arg
        }
    }
    return null
}