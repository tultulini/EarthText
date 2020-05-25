import { getAsciiDecimal, isNullOrWhiteSpace } from "../utils/strings"
import { existsSync, readFileSync } from 'fs'
import { arrayHasItems, isNullOrEmpty } from "../utils/arrays"
import { readFileLineByLine } from "../utils/files"
import { warnLog } from "../utils/log"
import { GlyphShape } from "../domain/glyph-shape"
import { parseCoordinate } from "../domain/coordinate"
import { Cutout } from "../domain/cutout"
import {join} from 'path'
const MAX_SHAPES_PER_GLYPH = 3
const MAX_CUTOUTS_PER_SHAPE = 3

const loadCutouts = (dir, charDecimal, shapeIndex) => {
    const cutouts = []
    for (let i = 0; i < MAX_CUTOUTS_PER_SHAPE; i++) {
        const currentFile = `${charDecimal.toString().padStart(3, '0')}_Inner_${shapeIndex}_${i}.txt`
        const filePath = join(dir, currentFile)

        if (!existsSync(filePath)) {
            break
        }
        const content = readFileSync(filePath).toString()
        if (isNullOrWhiteSpace(content)) {
            warnLog(`${filePath} is empty`)
            break
        }
        const coordSets = content.split(' ')
        const cutout = new Cutout({ coords: coordSets.map(co => parseCoordinate(co)) })
        cutouts.push(cutout)

    }
    return arrayHasItems(cutouts)
        ? cutouts
        : null
}

const loadShapes = (charDecimal, dir) => {
    const shapes = []
    for (let i = 0; i < MAX_SHAPES_PER_GLYPH; i++) {
        const currentFile = `${charDecimal.toString().padStart(3, '0')}_Outer_${i}.txt`
        const filePath = join(dir, currentFile)

        if (!existsSync(filePath)) {
            break
        }
        const content = readFileSync(filePath).toString()
        if (isNullOrWhiteSpace(content)) {
            warnLog(`${filePath} is empty`)
            break
        }
        const coordSets = content.split(' ')
        const shape = new GlyphShape({ coords: coordSets.map(co => parseCoordinate(co)) })
        shapes.push(shape)
        const cutouts = loadCutouts(dir, charDecimal, i)
        if (arrayHasItems(cutouts)) {
            shape.cutouts = cutouts
        }
    }
    return arrayHasItems(shapes)
        ? shapes
        : null
}

export const loadFontShapes = (dir, font) => {
    for (let char in font) {
        const asciiDecimal = getAsciiDecimal(char)
        const shapes = loadShapes(asciiDecimal, dir)
        if (isNullOrEmpty(shapes)) {
            warnLog(`${char} has no shapes`)
            continue
        }
        font[char].shapes = shapes
    }
    return font
}


