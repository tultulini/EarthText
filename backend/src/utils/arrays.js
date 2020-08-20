import { isNullOrUndefined } from "./object"

export const inNewArray = (item) => Array.isArray(item) ? [...item] : [item]

export const isNullOrEmpty = (items) => isNullOrUndefined(items) || items.length === 0

export const arrayHasItems = (items) => !isNullOrEmpty(items)

export const firstItem = (items) => arrayHasItems(items)
    ? items[0]
    : null

export const lastItem = (items) => {
    if (isNullOrEmpty(items)) {
        return null
    }

    return items[items.length - 1]
}

export const safeLength = (arr) => {
    return (isNullOrEmpty(arr))
        ? 0
        : arr.length
}

export const safeFind = (arr, predicate) => {
    return (isNullOrEmpty(arr))
        ? null
        : arr.find(predicate)
}

/**
 * Creates an array with a set size with all items having the same value
 * @param {number} size 
 * @param {*} setValue 
 */
export const getSetArray = (size, setValue) => {
    const arr = []
    while (arr.length < size) {
        arr.push(setValue)
    }
}