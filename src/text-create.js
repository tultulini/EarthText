import { getCurrentFont } from "./fonts";
import { createWriteStream, readFileSync } from 'fs'
import { loadFontBoundaries } from "./services/font-boundaries";
import { getFontDirectoryName, getHeaderTemplateFileName, getCirclePointsCount } from "./config";
import { loadFontShapes } from "./services/font-shapes";
import { Font } from "./domain/font";
import { debugLog, warnLog, errorLog } from "./utils/log";
import { stringify } from "./utils/json";
import { isNumberString } from "./utils/numbers";
import {
    nauticalMilesToKm,
    statuteMilesToKm,
    metersToKm,
    yardsToKm,
    convertToDecimalDegrees,
    getDestination
} from './utils/measurements'

import { getResourcesPath } from "./system";
import { Coordinate } from "./domain/coordinate";
import { Shape } from "./domain/shape";
import { getTemplate, KMLTemplateFiles, KMLTemplatePlaceHolders } from "./services/kml-templates";
import { arrayHasItems } from "./utils/arrays";

const getFileName = () => {
    const today = new Date()
    const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.kml`
    return fileName
}

const textDetails = {
    text: '\\c 123.45nm',
    latString: 'N45 18.96',
    lonString: 'W65 53.41',
    scaleFactor: 1,
    rotate: 0,
    color: 'Magenta',
    justify: 'center',
    outputFileName: 'kaki'
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

async function createText({ text, latString, lonString, scaleFactor, rotate, color, justify, outputFileName }) {
    const fontName = getCurrentFont()
    const fontDirPath = getResourcesPath(getFontDirectoryName())
    let font = await loadFontBoundaries(fontDirPath, new Font())
    font = loadFontShapes(fontDirPath, font)
    // writeFileSync("c:\\temp\\font.json", stringify(font))
    const writeStream = createWriteStream(getResourcesPath(getFileName()))
    writeKmlHeader(writeStream, outputFileName)

    const textCenterLat = convertToDecimalDegrees(latString)
    const textCenterLon = convertToDecimalDegrees(lonString)

    const circleDirective = extractCircleDirective(text)

    if (circleDirective.exists) {
        writeCircle(writeStream, circleDirective.radius, textCenterLat, textCenterLon, color)
    }
    
    writeKmlFooter(writeStream)
    debugLog('done')

}

function extractCircleDirective(text) {
    let exists = false
    const circleDirectiveSwitch = '\\c'
    let pos = text.indexOf(circleDirectiveSwitch)
    if (pos < 0 || pos + circleDirectiveSwitch.length === text.length) {
        return { exists: false }
    }
    pos += circleDirectiveSwitch.length
    const fl = extractFloat(text, pos)
    if (fl.index < 0) {
        throw new Error("Extracting Circle Directive Failed! Reason: Couldn't extract radius!")
    }
    if (fl.index + fl.value.toString().length == text.length) {

        throw new Error("Extracting Circle Directive Failed! Reason: missing radius units!")

    }
    const units = text.substring(fl.index + fl.value.toString().length)
    const radius = radiusToKM(fl.value, units)

    return { exists: true, radius }
}



function radiusToKM(radius, units) {
    switch (units.toLowerCase()) {
        case "km":
            return radius
        case "nm":
            return nauticalMilesToKm(radius)
        case "sm":
        case "sml":
            return statuteMilesToKm(radius)
            break
        case "m":
            return metersToKm(radius)
            break
        case "yard":
            return yardsToKm(radius)
        default:
            const message = `can't conver ${units} to km`
            throw new Error(message)
    }
}

function writeKmlHeader(writer, outputFileName) {
    const headerTemplatePath = getTemplate(KMLTemplateFiles.Header)
    const namePlaceHolder = '~~~KMLFileName~~~'
    const header = readFileSync(headerTemplatePath).toString().replace(namePlaceHolder, outputFileName)
    writer.write(header)
}

function writeKmlFooter(writer) {
    const footerTemplate = getTemplate(KMLTemplateFiles.Footer)
    writer.write(footerTemplate)
}

function writeCircle(writer, radiusKm, textCenterLat, textCenterLon, color) {
    const circlePointCount = getCirclePointsCount()
    const shape = new Shape()
    for (let i = 0; i < circlePointCount - 1; i++) {
        const bearing = (360 / (circlePointCount - 1)) * i
        const destination = getDestination(textCenterLat, textCenterLon, bearing, radiusKm)
        shape.addCoord(new Coordinate({ lon: destination.lon, lat: destination.lat }))
    }

    //Last point closes circle
    shape.addCoord(new Coordinate({ lon: shape[0].lon, lat: shape[0].lat }))
    const polygonName = `Circle: Lat=${textCenterLat.toFixed(3)} Lon=${textCenterLon.toFixed(3)} R=${radiusKm}Km`

    const style = `#${color.toLowerCase()}_filled_outline`
    writePolygon(writer, polygonName, shape, style)
}

function writePolygon(writer, polygonName, shape, style) {
    const placeMarkTemplate = getTemplate(KMLTemplateFiles.PolygonsPlacemark)
    //POLYGON NAME
    let placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.FileName, polygonName)

    //POLYGON STYLE
    placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.Style, style)

    //INNER POLYGONS
    if (arrayHasItems(shape.cutouts)) {
        const innerPolygonTemplate = getTemplate(KMLTemplateFiles.InnerPolygon)
        const cutouts = shape.cutouts.map(cutout => {
            const coords = stringifyCoords(cutout.coords)
            return innerPolygonTemplate.replace(KMLTemplatePlaceHolders.InnerPolygonCoords, coords)
        }).join("\r\n")
        placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.InnerPolygons, cutouts)
    }

    //OUTER SHAPE
    placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.OuterBoundariesCoords, stringifyCoords(shape.coords))
    writer.write(placeMark)
}

function stringifyCoords(coords) {
    return coords.map(coord => coord.stringify()).join(' ')
}
