export function Boundary({ north, south, east, west }) {
    Object.assign(this, { north, south, east, west })
    this.getNorthWest = () => new Coordinate({ lon: this.west, lat: this.north })
    this.getNorthEast = () => new Coordinate({ lon: this.east, lat: this.north })
    this.getSouthWest = () => new Coordinate({ lon: this.west, lat: this.south })
    this.getSouthEast = () => new Coordinate({ lon: this.east, lat: this.south })

}

const parseLine = (line) => {
    const start = line.indexOf('<')
    if (start < 0) {
        return null
    }
    const tagNameEnd = line.indexOf('>', start)
    const closingTagStart = line.indexOf('<', tagNameEnd + 1)
    if (closingTagStart < 0) {
        return null
    }

    if (tagNameEnd < 0) {
        return null
    }
    const tagName = line.substring(start + 1, tagNameEnd)
    const value = parseFloat(line.substring(tagNameEnd + 1, closingTagStart))
    return { tagName, value }
}



export function setBoundaryByLine(fontBoundary, line) {
    const { tagName, value } = parseLine(line)

    switch (tagName) {
        case "north":
        case "south":
        case "east":
        case "west":
            fontBoundary[tagName] = value
            break

        default:
            throw new Error(`tag name: ${tagName} is not supported`)
    }
}

