import { getCurrentFont } from "./fonts";
import { createWriteStream, readFileSync } from 'fs'
import { loadFontBoundaries } from "./services/font-boundaries";
import { getFontDirectoryName, getCirclePointsCount, getResourcesPath, getOriginCoordinate } from "./config";
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
    getDestination,
    calculateDistance,
    calculateBearing
} from './utils/measurements'


import { Coordinate } from "./domain/coordinate";
import { Shape } from "./domain/shape";
import { getTemplate, KMLTemplateFiles, KMLTemplatePlaceHolders } from "./services/kml-templates";
import { arrayHasItems } from "./utils/arrays";
import { isNullOrUndefined } from "./utils/object";


const getFileName = () => {
    const today = new Date()
    const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.kml`
    return fileName
}

const renderPlan = {
    outputFileName: 'kaki',
    actions: [{
        text: '\\c 123.45nm',
        latString: 'N45 18.96',
        lonString: 'W65 53.41',
        scaleFactor: 1,
        rotate: 0,
        color: 'Magenta',
        justify: 'center',

    }]
}

async function render(renderPlan) {
    const writer = createWriteStream(getResourcesPath(getFileName()))
    writeKmlHeader(writer, renderPlan.outputFileName)
    let font = await loadFontBoundaries(fontDirPath, new Font())
    font = loadFontShapes(fontDirPath, font)

    for (let action of renderPlan.actions) {
        await renderAction(action, font, writer)
    }

    writeKmlFooter(writer)
    debugLog('done')

}




async function renderAction(action, font, writer) {


    const fontName = getCurrentFont()
    const fontDirPath = getResourcesPath(getFontDirectoryName())
    // writeFileSync("c:\\temp\\font.json", stringify(font))

    const textCenterLat = convertToDecimalDegrees(cleanValue(action.latString))
    const textCenterLon = convertToDecimalDegrees(cleanValue(action.lonString))
    const textCenter = new Coordinate({ lat: textCenterLat, lon: textCenterLon })

    const circleDirective = extractCircleDirective(action.text)

    if (circleDirective.exists) {
        writeCircle(writer, circleDirective.radius, textCenter, action.color)
    }
    else {
        writeText(action, font, textCenter, writer)
    }

}

function writeText(action, font, textCenter, writer) {


    const textLines = action.text.split(/\r\n|\n|\r/)
    for (let line of textLines) {
        const lineSize = calculateTextSize(line, font, action.scaleFactor)
        let charPosition = adjustPositionByJustigy(action.justify, lineSize.width)

        for (let c of line.split('')) {
            writeChar(c, font, textCenter, charPosition, action, line, writer)
        }
    }
}


function writeChar(c, font, textCenter, initialPosition, action, line, writer) {
    const { text,
        scaleFactor,
        rotate,
        color,
        justify
    } = action

    const charSize = calculateCharSize(c, font)
    let charPosition = initialPosition + charSize.width / 2

    const bearing = rotate + (charPosition >= 0)
        ? 90
        : 270

    const charCenterDestination = getDestination(textCenter.lat, textCenter.lon, bearing, Math.abs(charPosition))    

    charPosition += charSize.width / 2

    const glyph = font[c]

    const originCoordinate = getOriginCoordinate()
    for (let shapeIdx in glyph.shapes) {
        const shape = glyph.shapes[shapeIdx]
        const transformedShape = shape.clone()
        const transformedCoords = getTransformedCoordinates(shape.coords, originCoordinate, charCenterDestination, rotate)
        transformedShape.coords = transformedCoords
        if (arrayHasItems(transformedShape.cutouts)) {
            for (let cutout of transformedShape.cutouts) {
                const transCutoutCoords = getTransformedCoordinates(cutout.coords, originCoordinate, charCenterDestination, rotate)
                cutout.coords = transCutoutCoords
            }
        }
        // const name = line.splice()
        // writePolygon()
    }

}

function getTransformedCoordinates(coords, originCoordinate, charCenterDestination, rotate) {
    const transformedCoords = []
    for (let coordIdx of coords) {
        const coord = shape.coords[coordIdx]
        const originDistance = calculateDistance(originCoordinate.lat, originCoordinate.lon, coord.lat, coord.lon)
        const originBearing = calculateBearing(originCoordinate, coord)
        const transformedCoord = getDestination(charCenterDestination.lat, charCenterDestination.lon, originBearing + rotate, originDistance * scaleFactor)
        transformedCoords.push(transformedCoord)
    }
    return transformedCoords
}


function adjustPositionByJustigy(justify, textWidth) {
    let position = 0
    switch (justify.toLowerCase()) {
        case "left":
            position = 0
            break
        case "right":
            position = -textWidth
            break
        default:
            position = -textWidth / 2

    }
    return position
}

//TODO: optimization - add glyph size when loading to actual glyph
function calculateTextSize(text, font, scaleFactor) {
    let width = 0
    let height = 0

    for (let c of text.split('')) {
        const charSize = calculateCharSize(c, font)
        width += charSize.width
        height = Math.max(height, charSize.height)
    }
    return { height: height * (scaleFactor || 1), width: width * (scaleFactor || 1) }
}

function calculateCharSize(c, font) {
    const glyph = font[c]
    if (isNullOrUndefined(glyph)) {
        throw new Error(`Couldn't not calculate size of ${c} as there's no glyph definition for it in the font`)
    }
    const width = calculateDistance(glyph.boundary.north, glyph.boundary.west, glyph.boundary.north, glyph.boundary.east)
    const height = calculateDistance(glyph.boundary.north, glyph.boundary.west, glyph.boundary.south, glyph.boundary.west)
    return { height, width }
}

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

const cleanPolygonName = (value) => {
    let result = ''
    for (let char of value.split('')) {
        switch (char) {
            case "&":
                result += 'A'
                break
            case "<":
                result += 'L'
                break
            case ">":
                result += 'G'
                break
            default:
                result += char

        }
    }
    return result
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

function writeCircle(writer, radiusKm, textCenter, textCenterLon, color) {
    const circlePointCount = getCirclePointsCount()
    const shape = new Shape()
    for (let i = 0; i < circlePointCount - 1; i++) {
        const bearing = (360 / (circlePointCount - 1)) * i
        const destination = getDestination(textCenter.lat, textCenter.lon, bearing, radiusKm)
        shape.addCoord(new Coordinate({ lon: destination.lon, lat: destination.lat }))
    }

    //Last point closes circle
    shape.addCoord(new Coordinate({ lon: shape[0].lon, lat: shape[0].lat }))
    const polygonName = `Circle: Lat=${textCenter.lat.toFixed(3)} Lon=${textCenter.lon.toFixed(3)} R=${radiusKm}Km`

    const style = `#${color.toLowerCase()}_filled_outline`
    writePolygon(writer, polygonName, shape, style)
}

function writePolygon(writer, polygonName, shape, style) {
    const placeMarkTemplate = getTemplate(KMLTemplateFiles.PolygonsPlacemark)
    //POLYGON NAME
    let placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.PolygonName, polygonName)

    //POLYGON STYLE
    placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.Style, style)

    //INNER POLYGONS
    if (arrayHasItems(shape.cutouts)) {
        const innerPolygonTemplate = getTemplate(KMLTemplateFiles.InnerPolygon)
        const cutouts = shape.cutouts.map(cutout => {
            const coords = stringifyCoords(cutout.coords)
            return innerPolygonTemplate.replace(KMLTemplatePlaceHolders.InnerPolygonCoords, coords)
        }).join("\r\n") + '\r\n'
        placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.InnerPolygons, cutouts)
    }

    //OUTER SHAPE
    placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.OuterBoundariesCoords, stringifyCoords(shape.coords))
    writer.write(placeMark)
}

function stringifyCoords(coords) {
    return coords.map(coord => coord.stringify()).join(' ')
}
render(renderPlan)
