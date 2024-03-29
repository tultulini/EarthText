import { getCirclePointsCount, getOriginCoordinate } from "./config";
import { errorLog } from "./utils/log";
import { extractFloat } from "./utils/numbers";
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
import { isNullOrWhiteSpace } from "./utils/strings";
import { StringBuilder } from "./utils/string-builder";
import { loadFonts } from "./services/fonts";



export const createLayer = async (renderPlan) => {
    try {
        const writer = new StringBuilder()
        await writeKmlHeader(writer, renderPlan.planName || `Earth text product ${(new Date()).toISOString()}`)
        const font = await loadFonts(renderPlan.font)

        for (let action of renderPlan.actions) {
            await renderAction(action, font, writer)
        }

        await writeKmlFooter(writer)
        const kml = writer.toString(true)
        return kml

    } catch (err) {
        errorLog(`error occured!!!`, err)
    }

}




async function renderAction(action, font, writer) {

    const textCenterLat = convertToDecimalDegrees(cleanValue(action.lat))
    const textCenterLon = convertToDecimalDegrees(cleanValue(action.lon))
    
    const textCenter = new Coordinate({ lat: textCenterLat, lon: textCenterLon })

    const circleDirective = extractCircleDirective(action.text)

    if (circleDirective.exists) {
        await writeCircle(writer, circleDirective.radius, textCenter, action.color)
    }
    else {
        await writeText(action, font, textCenter, writer)
    }

}

async function writeText(action, font, textCenter, writer) {


    const textLines = action.text.split(/\r\n|\n|\r/)

    const lineHeight = textLines.length > 1
        ? textLines.reduce((max, lineo) => {
            const lineSize = calculateTextSize(lineo, font, action.scaleFactor)
            return Math.max(lineSize.height, max)
        }, 0) * 1.5
        : 0

    let currentCenter = textCenter
    for (let line of textLines) {
        const lineSize = calculateTextSize(line, font, action.scaleFactor)
        let charPosition = adjustPositionByJustify(action.justify, lineSize.width)


        for (let c of line.split('')) {
            charPosition = await writeChar(c, font, currentCenter, charPosition, action, writer)
        }
        if (lineHeight > 0) {
            currentCenter = getDestination(currentCenter.lat, currentCenter.lon, 180 + action.rotate, Math.abs(lineHeight))

        }

    }
}


async function writeChar(c, font, textCenter, initialPosition, action, writer) {
    const {
        scaleFactor,
        rotate,
        color
    } = action

    const charSize = calculateCharSize(c, font, scaleFactor)
    let charPosition = initialPosition + charSize.width / 2

    const bearing = rotate + ((charPosition >= 0)
        ? 90
        : 270)


    const charCenterDestination = getDestination(textCenter.lat, textCenter.lon, bearing, Math.abs(charPosition))
    charPosition += charSize.width / 2



    const glyph = font[c]

    const originCoordinate = getOriginCoordinate()
    for (let shapeIdx in glyph.shapes) {
        const shape = glyph.shapes[shapeIdx]
        const transformedShape = shape.clone()
        const transformedCoords = getTransformedCoordinates(shape.coords, originCoordinate, charCenterDestination, rotate, action.scaleFactor)
        transformedShape.coords = transformedCoords
        if (arrayHasItems(transformedShape.cutouts)) {
            for (let cutout of transformedShape.cutouts) {
                const transCutoutCoords = getTransformedCoordinates(cutout.coords, originCoordinate, charCenterDestination, rotate, action.scaleFactor)
                cutout.coords = transCutoutCoords
            }
        }
        // const name = line.splice()
        const name = `${c} - ${shapeIdx} `
        const style = `#${color.toLowerCase()}_filled_outline`
        await writePolygon(writer, name, transformedShape, style)
    }
    return charPosition

}

function getTransformedCoordinates(coords, originCoordinate, charCenterDestination, rotate, scaleFactor) {
    const transformedCoords = []
    for (let coord of coords) {
        const originDistance = calculateDistance(originCoordinate.lat, originCoordinate.lon, coord.lat, coord.lon)
        const originBearing = calculateBearing(originCoordinate, coord)
        const transformedCoord = getDestination(charCenterDestination.lat, charCenterDestination.lon, originBearing + rotate, originDistance * scaleFactor)
        transformedCoords.push(transformedCoord)
    }
    return transformedCoords
}


function adjustPositionByJustify(justify, textWidth) {
    let position = 0
    switch (isNullOrWhiteSpace(justify) ? justify : justify.toLowerCase()) {
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
        const charSize = calculateCharSize(c, font, scaleFactor)
        width += charSize.width
        height = Math.max(height, charSize.height)
    }
    return { height, width }
}

function calculateCharSize(c, font, scaleFactor) {
    const glyph = font[c]
    if (isNullOrUndefined(glyph)) {
        throw new Error(`Couldn't not calculate size of ${c} as there's no glyph definition for it in the font`)
    }
    const width = calculateDistance(glyph.boundary.north, glyph.boundary.west, glyph.boundary.north, glyph.boundary.east) * (scaleFactor || 1)
    const height = calculateDistance(glyph.boundary.north, glyph.boundary.west, glyph.boundary.south, glyph.boundary.west) * (scaleFactor || 1)
    return { height, width }
}

const cleanValue = (value) => {
    const len = value.length
    let result = ''
    for (let i = 0; i < len; i++) {
        const char = value[i].toUpperCase()
        if (/[0-9SW\-.]/.test(char)) {
            result += char
        }
        else if(char!=="\""){
            result += " "
        }
    }
    return result.trim().replace(/  +/g, ' ')
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
    switch (units.trim().toLowerCase()) {
        case "km":
            return radius
        case "nm":
            return nauticalMilesToKm(radius)
        case "sm":
        case "sml":
            return statuteMilesToKm(radius)
        case "m":
            return metersToKm(radius)
        case "yard":
            return yardsToKm(radius)
        default:
            throw new Error(`can't conver ${units} to km`)
    }
}

async function writeKmlHeader(writer, planName) {
    //TODO: optimization - remove unused styles from header
    const headerTemplate = await getTemplate(KMLTemplateFiles.Header)
    const header = headerTemplate.replace(KMLTemplatePlaceHolders.HeaderFileName, planName)
    writer.write(header)
}

async function writeKmlFooter(writer) {
    const footerTemplate = await getTemplate(KMLTemplateFiles.Footer)
    writer.write(footerTemplate)
}

async function writeCircle(writer, radiusKm, textCenter, color) {
    const circlePointCount = getCirclePointsCount()
    const coords = []
    for (let i = 0; i < circlePointCount - 1; i++) {
        const bearing = (360 / (circlePointCount - 1)) * i
        const destination = getDestination(textCenter.lat, textCenter.lon, bearing, radiusKm)
        coords.push(new Coordinate({ lon: destination.lon, lat: destination.lat }))
    }

    //Last point closes circle
    coords.push(new Coordinate({ lon: coords[0].lon, lat: coords[0].lat }))
    const shape = new Shape({ coords })
    const polygonName = `Circle: Lat=${textCenter.lat.toFixed(3)} Lon=${textCenter.lon.toFixed(3)} R=${radiusKm}Km`

    const style = `#${color.toLowerCase()}_filled_outline`
    await writePolygon(writer, polygonName, shape, style)
}

async function writePolygon(writer, polygonName, shape, style) {
    const placeMarkTemplate = await getTemplate(KMLTemplateFiles.PolygonsPlacemark)
    //POLYGON NAME
    let placeMark = placeMarkTemplate.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.PolygonName, cleanPolygonName(polygonName))


    //POLYGON STYLE
    placeMark = placeMark.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.Style, style)

    //INNER POLYGONS
    if (arrayHasItems(shape.cutouts)) {
        const innerPolygonTemplate = await getTemplate(KMLTemplateFiles.InnerPolygon)
        const cutouts = shape.cutouts.map(cutout => {
            const coords = stringifyCoords(cutout.coords)
            return innerPolygonTemplate.replace(KMLTemplatePlaceHolders.InnerPolygonCoords, coords)
        }).join("\r\n") + '\r\n'
        placeMark = placeMark.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.InnerPolygons, cutouts)
    }
    else {
        placeMark = placeMark.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.InnerPolygons, '')

    }

    //OUTER SHAPE
    placeMark = placeMark.replace(KMLTemplatePlaceHolders.PolygonsPlacemark.OuterBoundariesCoords, stringifyCoords(shape.coords))
    writer.write(placeMark)
}

function stringifyCoords(coords) {
    return coords.map(coord => coord.stringify()).join(' ')
}


