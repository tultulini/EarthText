import { getTextFile } from "./accessors/s3"
import { FontFiles, getS3BucketName } from "../config"
import { debugLog, errorLog } from "../utils/log"
import { fontFromDto } from "../domain/font"
import { stringify } from "../utils/json"

export const loadFonts = async () => {
    try {
        const json = await getTextFile(FontFiles.Default, getS3BucketName())
        const font = fontFromDto(JSON.parse(json))
        return font
    }
    catch (err) {
        const message = `failed to load fonts`
        errorLog(message, err)
        throw new Error(message)
    }

}