import { isSomething, isNullOrUndefined } from "./object"

export const isValidHexaChar = (char) => (char >= '0' && char <= '9')
    || (char >= 'a' && char <= 'f')
    || (char >= 'A' && char <= 'F')

export const isValidHexaByte = (hexaByte) => {
    return hexaByte.length === 2
        && isValidHexaChar(hexaByte.substr(0, 1))
        && isValidHexaChar(hexaByte.substr(1, 1))

}

export const isPositiveNumber = num => {
    return isNumber(num) && num > 0
}

export const isNumber = val => {
    return isSomething(val) && (typeof val) === 'number'
}

export const isNumberString = (val) => !isNaN(+val)

export const nullToZero = (val) => isNullOrUndefined(val) ? 0 : val

export const extractFloat = (val, startPos) => {
    let start = val.substring(startPos || 0).search(/[0-9.]/)
    if (start < 0) {
        return { index: -1 }
    }
    start += (startPos || 0)
    let end = val.substring(start).search(/[^0-9.]/)
    return {
        value: end < 0
            ? parseFloat(val.substring(start))
            : parseFloat(val.substring(start, end)),
        index: start
    }

}