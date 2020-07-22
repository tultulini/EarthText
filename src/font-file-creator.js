import { Font } from "./domain/font"
import { loadFontBoundaries } from "./services/font-boundaries"
import { getResourcesPath, FontFiles } from "./config"
import { join } from 'path'
import { loadFontShapes } from "./services/font-shapes"
import { writeFileSync } from 'fs'
async function createFontFile(fontFilePath) {
    const dir = getResourcesPath(join('fonts', 'font 2'))
    let font = await loadFontBoundaries(dir, new Font())
    font = loadFontShapes(dir, font)
    writeFileSync(fontFilePath, JSON.stringify(font))
}
createFontFile(getResourcesPath(FontFiles.AthabascaBold))
