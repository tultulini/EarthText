import { glyphFromDto } from "./glyph"
import { isNullOrEmpty } from "../utils/arrays"
import { errorLog } from "../utils/log"

export function Font() {

}

export const fontFromDto = (dto) => {
    const font = new Font()
    for (let c in dto) {
        const glyphDto = dto[c]        
        const glyph = glyphFromDto(glyphDto, c)
        font[c] = glyph
    }
    return font
}