import { join } from 'path'
import { getAsciiDecimal } from '../utils/strings'
import { debugLog, warnLog } from '../utils/log'
import { readFileLineByLine } from '../utils/files'
import { setBoundaryByLine, Boundary } from '../domain/boundary'
import { isNullOrUndefined } from '../utils/object'
import { stringify } from '../utils/json'
import { existsSync } from 'fs'
import { Glyph } from '../domain/glyph'

export const loadFontBoundaries = async (dir, font) => {
    const startChar = getAsciiDecimal(' ')
    const endChar = getAsciiDecimal('~')

    for (let c = startChar; c <= endChar; c++) {
        const currentChar = String.fromCharCode(c)
        const currentFile = `${c.toString().padStart(3, '0')}_Boundary.txt`
        const filePath = join(dir, currentFile)
        if (!existsSync(filePath)) {
            warnLog(`filePath: ${filePath} for char: '${currentChar}' doesn't exist => skipping!`)
        }

        await readFileLineByLine(filePath, (line) => {
            if (isNullOrUndefined(font[currentChar])) {
                font[currentChar] = new Glyph({ boundary: new Boundary() })
            }
            setBoundaryByLine(font[currentChar].boundary, line)
        })

    }    
    return font
}