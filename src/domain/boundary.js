export function Boundary() {

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

