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

