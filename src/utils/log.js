import { parse } from 'path'
import { isNullOrUndefined } from "./object"

//Replace LogLevelFilter with something configurable
const LogLevelFilter = "ALL"

const SKIP_FRAMES = 4
let loggingEnabled = true

export const toggleLogging = (enabled) => {
    loggingEnabled = enabled
}


const fileLogger = null//getFileLogger()

const LogLevels = {
    Debug: "DEBUG",
    Trace: "TRACE",
    Info: "INFO",
    Warn: "WARN",
    Error: "ERROR"
}

const generateLogMap = () => {
    const levels = Object.values(LogLevels)
    const map = {}
    if (LogLevelFilter === "ALL") {
        levels.forEach((level) => map[level] = true)
    }
    else {
        const filterLevel = levels.indexOf(LogLevelFilter)
        levels.forEach((level, i) => map[level] = i >= filterLevel)
    }
    return map
}

const LogMap = generateLogMap()


const getLogSource = () => {
    try {
        const stackParts = (new Error('')).stack.split(' at ')
        const details = stackParts[SKIP_FRAMES]
        const firstBracketPos = details.indexOf('(')
        const funcName = firstBracketPos > -1
            ? details.substr(0, details.indexOf(' '))
            : '<arrow-func>'
        const positionDetails = firstBracketPos >= 0
            ? details.substring(firstBracketPos + 1, details.indexOf(')') - 1)
            : details
        const endOfPath = positionDetails.indexOf(':', 4)
        const filePath = positionDetails.substr(0, endOfPath)
        const lineNumber = positionDetails.substring(endOfPath + 1, positionDetails.indexOf(':', endOfPath + 1))
        const file = parse(filePath).base
        return { funcName, lineNumber, file }
    } catch (error) {
        console.log(`error occurred during log source acquisition :${error}`)
        return { funcName: '', lineNumber: '', file: '' }

    }
}

const log = (message, level) => {
    if (!(loggingEnabled && LogMap[level])) {
        return
    }

    const { funcName, lineNumber, file } = getLogSource()
    const formattedMessage = `${(new Date()).toISOString()} [${level}] ${file}::${funcName}:${lineNumber} >> ${message}`
    console.log(formattedMessage)

    try {
        if (fileLogger) {
            fileLogger.write(`${formattedMessage}\r\n`)
        }
    }
    catch (error) {
        console.error(`Failed to write to log file. Error: ${error}`)
    }

}

export const infoLog = (message) => {
    log(message, LogLevels.Info)
}

export const debugLog = (message) => {

    log(message, LogLevels.Debug)
}

export const warnLog = (message) => {
    log(message, LogLevels.Warn)
}

export const errorLog = (message, error) => {
    const errorMessage = isNullOrUndefined(error)
        ? ''
        : `\r\nError: ${error}. ${error.stack}`
    const formattedMessage = `${message}${errorMessage}`
    log(formattedMessage, LogLevels.Error)
}
