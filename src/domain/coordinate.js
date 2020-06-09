import { converToRadian } from "../utils/measurements"
import { isNullOrUndefined } from "../utils/object"
import { roundTo } from "../utils/numbers"

export function Coordinate({ lon, lat, alt }) {
    Object.assign(this, { lon: fixDigits(lon), lat: fixDigits(lat), alt: fixDigits(alt) })
    this.stringify = () => `${this.lon},${this.lat},${this.alt || 0}`
    this.clone = () => new Coordinate({ lat: this.lat, lon: this.lon, alt: this.alt })
    this.converToRadian = () => {
        return new Coordinate({ lat: converToRadian(this.lat), lon: converToRadian(this.lon), alt: this.alt })
    }
}

function fixDigits(num) {
    return isNullOrUndefined(num)
        ? num
        : roundTo(num, 6)
}

export function parseCoordinate(val) {
    const parts = val.split(",")
    const lon = parseFloat(parts[0])
    const lat = parseFloat(parts[1])
    const alt = parseFloat(parts[2])
    return new Coordinate({ lon, lat, alt })
}

