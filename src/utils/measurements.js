import { Coordinate } from "../domain/coordinate"

const KM_IN_NAUTICAL_MILE = 1.852
const KM_IN_STATUTE_MILE = 1.609344
const METERS_IN_KM = 1000
const YARDS_IN_KM = 1093.613298
const MINUTES_IN_HOUR = 60
const SECONDS_IN_HOUR = 3600
const EARTH_RADIUS_KM = 6371  //Earth Radius in Km
/**
 * 
 * @param {number} nm nautical miles
 */
export const nauticalMilesToKm = (nm) => nm * KM_IN_NAUTICAL_MILE

/**
 * 
 * @param {number} sml statute miles
 */
export const statuteMilesToKm = (sml) => sml * KM_IN_STATUTE_MILE

/**
 * 
 * @param {number} m meters
 */
export const metersToKm = (m) => m / METERS_IN_KM

/**
 * 
 * @param {number} yards yards
 */
export const yardsToKm = (yards) => yards / YARDS_IN_KM



export const convertToDecimalDegrees = (value) => {
    const components = value.split(' ').map(comp => parseFloat(comp))
    const sign = components[0] >= 0 ? 1 : -1

    switch (components.length) {
        case 1://DDD.DDD (Decimal Degrees)
            return parseFloat(value)

        case 2://DD MM.MMM (Degrees DEcimal Minutes)
            return components[0] + components[1] * sign / MINUTES_IN_HOUR

        case 3://DD MM SS.SSS (Degrees Minutes Seconds)
            return components[0] + components[1] * sign / MINUTES_IN_HOUR + components[2] * sign / SECONDS_IN_HOUR

        default:
            throw new Error(`Convert to decimal degrees Failed! Reason: can't handle ${components.length} components`)
    }
}

export const getDestination = (latDeg, lonDeg, bearingDeg, distanceKm) => {
    const angularDistance = distanceKm / EARTH_RADIUS_KM
    const latRadInput = converToRadian(latDeg)
    const lonRadInput = converToRadian(lonDeg)
    const bearingRad = converToRadian(bearingDeg)
    const latRadRes =
        Math.asin(Math.sin(latRadInput) * Math.cos(angularDistance) + Math.cos(latRadInput) * Math.sin(angularDistance) * Math.cos(bearingRad))

    const lonRadRes = lonRadInput + Math.atan2(Math.cos(angularDistance) - Math.sin(latRadInput) * Math.sin(latRadRes),
        Math.sin(bearingRad) * Math.sin(angularDistance) * Math.cos(latRadInput))


    return new Coordinate({ lat: converToDegrees(latRadRes), lon: converToDegrees(lonRadRes) })
}

export const calculateDistance = (latFromDeg, lonFromDeg, latToDeg, lonToDeg) => {
    const latFromRad = converToRadian(latFromDeg)
    const lonFromRad = converToRadian(lonFromDeg)
    const latToRad = converToRadian(latToDeg)
    const lonToRad = converToRadian(lonToDeg)
    const deltaLat = latToRad - latFromRad
    const deltaLon = lonToRad - lonFromRad
    const a = Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(latFromRad) * Math.cos(latToRad) * Math.pow(Math.sin(deltaLon / 2), 2)
    const c = 2 * Math.atan2(Math.sqrt(1 - a), Math.sqrt(a))
    return EARTH_RADIUS_KM * c
}

export const calculateBearing = (originCoord, targetCoord) => {

    const originCoordRad = originCoord.converToRadian()
    const targetCoordRad = targetCoord.converToRadian()

    let bearing = converToDegrees(Math.atan2(Math.cos(originCoordRad.lat) * Math.sin(targetCoordRad.lat) - Math.sin(originCoordRad.lat) * Math.cos(targetCoordRad.lat) * Math.cos(targetCoordRad.lon - originCoordRad.lon),
        Math.sin(targetCoordRad.lon - originCoordRad.lon) * Math.cos(targetCoordRad.lat)))

    bearing = bearing % 360

    if (bearing < 0) {
        bearing += 360
    }

    return bearing
}

export const converToRadian = (deg) => {
    return deg * Math.PI / 180
}
export const converToDegrees = (rad) => {
    return rad * 180 / Math.PI
}