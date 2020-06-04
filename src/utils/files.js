import readline from 'readline'
import { createReadStream, existsSync } from 'fs'

export function readFileLineByLine(filePath, lineCallback) {
    return new Promise((resolve) => {
        if (!existsSync(filePath)) {
            resolve()
            return
        }
        const readInterface = readline.createInterface({
            input: createReadStream(filePath),
            crlfDelay: Infinity
        });
        readInterface.on('line', function (line) {
            lineCallback(line)
        });

        readInterface.on('close', () => {
            resolve()
        })
    })
}