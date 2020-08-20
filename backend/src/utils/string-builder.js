import { isNullOrEmpty } from "./arrays"

export function StringBuilder() {
    this.allData = []
    this.write = (value) => {
        this.allData.push(value)
    }
    this.toString = (stripFormatting) => {
        if (isNullOrEmpty(this.allData)) {
            return null
        }
        const entireString = this.allData.join('')
        return stripFormatting
            ? entireString.replace(/\r\n/g, '').replace(/\t/g, '')
            : entireString
    }

}