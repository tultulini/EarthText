import { isNullOrUndefined } from "./object"
import { isNullOrEmpty } from "./arrays"

export function StringBuilder() {
    this.allData = []
    this.write = (value) => {
        this.allData.push(value)
    }
    this.toString = () => {
        if (isNullOrEmpty(this.allData)) {
            return null
        }
        return this.allData.join('')
    }

}