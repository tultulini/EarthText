import readline from 'readline'
import { createReadStream,existsSync } from 'fs'
import { isNumberString } from './numbers';
export function readFileLineByLine(filePath, lineCallback) {
    return new Promise((resolve, reject) => {
        if(!existsSync(filePath))
        {
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