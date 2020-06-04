import { Coordinate } from "../domain/coordinate"
import { sind, cosd, asind, atan2d, cosr, sinr } from "./maths"

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

export const getDestination = (lat, lon, bearing, distanceKm) => {
    const angularDistance = distanceKm / EARTH_RADIUS_KM
    const sinAngularDist = sinr(angularDistance)
    const cosAngularDist = cosr(angularDistance)

    const latRes =
        asind(sind(lat) * cosAngularDist + cosd(lat) * sinAngularDist * cosd(bearing))
    const lonRes = lon + atan2d(
        sind(bearing) * sinAngularDist * cosd(lat),
        cosAngularDist - sind(lat) * sind(latRes))

    return new Coordinate({ lat: latRes, lon: lonRes })
}


export const calculateDistance = (latSource, lonSource, latDestination, lonDestination) => {
    const deltaLat = latDestination - latSource
    const deltaLon = lonDestination - lonSource

    const a = sind(deltaLat / 2) * sind(deltaLat / 2) +
        cosd(latSource) * cosd(latDestination) * sind(deltaLon / 2) * sind(deltaLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return EARTH_RADIUS_KM * c
}



export const calculateBearing = (originCoord, targetCoord) => {
    let bearing = atan2d(
        sind(targetCoord.lon - originCoord.lon) * cosd(targetCoord.lat),
        cosd(originCoord.lat) * sind(targetCoord.lat) - sind(originCoord.lat) * cosd(targetCoord.lat) * cosd(targetCoord.lon - originCoord.lon))

    bearing = bearing % 360

    if (bearing < 0) {
        bearing += 360
    }

    return bearing
}

