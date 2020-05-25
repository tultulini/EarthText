import { isSomething, isNullOrUndefined } from "./object";

export const isNullOrWhiteSpace = (value) => {
    if (isNullOrUndefined(value)) {
        return true
    }

    if (typeof value !== 'string') {
        throw new Error("value isn't string")
    }

    return value.trim().length === 0

}

export const getAsciiDecimal = (c, charPosition) => {
    return c.charCodeAt(isSomething(charPosition) ? charPosition : 0)
}