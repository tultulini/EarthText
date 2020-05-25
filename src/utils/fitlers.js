
import { firstItem } from "./arrays"
import { isSomething } from "./object"
import { isAsyncFunctionResult } from "./async"

export function medianFilter({ windowSize, comparer, valueExtractor, callback }) {
    Object.assign(this, { windowSize, comparer, valueExtractor, callback })
    this.buffer = []
    this.filteredBuffer = []
    this.post = async (item) => postItem(item, this)
}

async function postItem(item, filter) {
    if (filter.buffer.length >= filter.windowSize) {
        const removedItem = firstItem(filter.buffer)
        filter.buffer.splice(0, 1)
        const position = filter.filteredBuffer.indexOf(removedItem)
        filter.filteredBuffer.splice(position, 1)
    }
    filter.buffer.push(item)
    filter.filteredBuffer.push(item)
    filter.filteredBuffer.sort(filter.comparer)
    const medianValue = getMedianValue(filter)
    if (filter.callback) {
        const callbackResult = filter.callback(medianValue)
        if (isAsyncFunctionResult(callbackResult)) {
            await callbackResult
        } else {
            return callbackResult
        }
    }
    else {
        return medianValue
    }

}

function getMedianValue(filter) {
    const length = filter.filteredBuffer.length

    if (length === 0) {
        return null
    }

    const itemType = typeof filter.filteredBuffer[0]

    if (length & 1 == 1) {
        const medianItem = filter.filteredBuffer[parseInt(length / 2)]
        if (itemType === "number") {
            return medianItem
        }
        return isSomething(filter.valueExtractor)
            ? filter.valueExtractor(medianItem)
            : medianItem
    }

    const index = length / 2

    if (itemType === "number") {
        return (filter.filteredBuffer[index - 1] + filter.filteredBuffer[index]) / 2
    }

    if (itemType !== "object") {
        throw new Error(`Can't calculate median for item type: ${itemType}`)
    }

    if (isSomething(filter.valueExtractor)) {
        return (filter.valueExtractor(filter.filteredBuffer[index - 1]) + filter.valueExtractor(filter.filteredBuffer[index])) / 2
    }

    return [filter.filteredBuffer[index - 1], filter.filteredBuffer[index]]



}
