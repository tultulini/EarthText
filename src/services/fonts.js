import { getTextFile } from "./accessors/s3"
import { FontFiles, getS3BucketName } from "../config"
import { errorLog, debugLog } from "../utils/log"
import { fontFromDto } from "../domain/font"
import { removeDoubleSpaces, isNullOrWhiteSpace } from "../utils/strings"

const getFileName = (fontName) => {
    const formattedFontName = isNullOrWhiteSpace(fontName)
        ? null
        : removeDoubleSpaces(fontName.trim().toLowerCase())

    switch (formattedFontName) {
        case "athabasca bold":
            return FontFiles.AthabascaBold
        case "avenit roman":
            return FontFiles.AvenitRoman
    }

    return FontFiles.Default
}

export const loadFonts = async (fontName) => {
    try {
        const filePath = `fonts/${getFileName(fontName)}`
        debugLog(`downloading ${filePath} font file`)
        const json = await getTextFile(filePath, getS3BucketName())
        const font = fontFromDto(JSON.parse(json))
        return font
    }
    catch (err) {
        const message = `failed to load fonts`
        errorLog(message, err)
        throw new Error(message)
    }
}
