import { minutesSpan } from "./date-time"

/**
 * Finds the slot index of time relative to start
 * @param {string} start iso date string
 * @param {string} timeStamp iso date string
 * @param {number} resolution minutes resolution
 * @returns {number} slot index
 */
export const getSlotIndex = (start, timeStamp, resolution) => {
    return parseInt(minutesSpan(start, timeStamp) / resolution)
}

/**
 * Gets initial slot array - WARNING: if resolution is too high then some timestamps might be out of range
 * @param {string} start iso date string
 * @param {string} end iso date string
 * @param {number} resolution minutes resolution
 * @returns {Array<number>} slots
 */
export function getInitialSlotArray(start, end, resolution, valuePredicate) {
    const minutesCount = minutesSpan(start, end)
    const vectorSize = parseInt(parseInt(minutesCount / resolution))
    return getSetArray(vectorSize, valuePredicate())
}