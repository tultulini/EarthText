import { getCurrentFont } from "./fonts";
import { createWriteStream, writeFileSync } from 'fs'
import { join } from 'path'
import { loadFontBoundaries } from "./services/font-boundaries";
import { getFontDirectoryName } from "./config";
import { loadFontShapes } from "./services/font-shapes";
import { Font } from "./domain/font";
import { debugLog } from "./utils/log";
import { stringify } from "./utils/json";
import { isNumberString } from "./utils/numbers";
const getFileName = () => {
    const today = new Date()
    const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.kml`
    return fileName
}
const textDetails = {
    text: 'lalalal',
    latString: 'N45 18.96',
    lonString: 'W65 53.41',
    scaleFactor: 1,
    rotate: 0,
    color: 'Magenta',
    justify: 'center'

}
createText(textDetails)
const cleanValue = (value) => {
    const len = value.length
    let result = ''
    for (let i = 0; i < len; i++) {
        const char = value[i].toUpperCase()
        if (/[0-9SW.]/.test(char)) {
            result += char
        }
        else {
            result += " "
        }
    }
    return result.trim().replace(/  +/g, ' ').replace(/W/g, '-').replace(/S/g, '-');
}

async function createText({ text, latString, lonString, scaleFactor, rotate, color, justify }) {
    const fontName = getCurrentFont()
    const fontDirPath = join(process.cwd(), 'resources', getFontDirectoryName())
    let font = await loadFontBoundaries(fontDirPath, new Font())
    font = loadFontShapes(fontDirPath, font)
    // writeFileSync("c:\\temp\\font.json", stringify(font))
    if(text.indexOf('\\c')>=0)
    {

    }
    
    debugLog('done')
    // const writeStream = createWriteStream(join(process.cwd(), 'resources', getFileName()))

}


