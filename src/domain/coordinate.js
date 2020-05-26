export function Coordinate({ lon, lat, alt }) {
    Object.assign(this, { lon, lat, alt })
    this.stringify = () => `${this.lon},${this.lat},${this.alt || 0}`
}

export function parseCoordinate(val) {
    const parts = val.split(",")
    const lon = parts[0]
    const lat = parts[1]
    const alt = parts[2]
    return new Coordinate({ lon, lat, alt })
}

