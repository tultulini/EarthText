import readline from 'readline'
import {createReadStream} from 'fs'
import { isNumberString } from './numbers';
export function readCSV(csvPath) {
    return new Promise((resolve, reject) => {
        const readInterface = readline.createInterface({
            input: createReadStream(csvPath),
            crlfDelay: Infinity
        });
        let fields
        let lineIndex = 0
        let objs = []

        readInterface.on('line', function (line) {
            const currentLine = line.split(',')
            if (lineIndex++ == 0) {
                fields = currentLine
                return
            }
            handleDataLine(currentLine, fields, objs, lineIndex)
        });

        readInterface.on('close', () => {
            resolve(objs)
        })
    })
}

function handleDataLine(currentLine, fields, objs, lineIndex) {

    if (currentLine.length != fields.length) {
        console.error(`not the same amount of elements. line: ${currentLine}`)
        throw new Error(`not the same amount of elements. lineIndex: ${lineIndex}, line: ${currentLine}`)
    }
    const newObj = {
    }

    for (let field in fields) {
        const val = currentLine[field]
        newObj[fields[field]] = isNumberString(val) ? parseFloat(val) : val
    }
    objs.push(newObj)
}
