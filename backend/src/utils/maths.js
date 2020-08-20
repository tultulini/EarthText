export const converToRadian = (deg) => {
    return deg * Math.PI / 180
}
export const converToDegrees = (rad) => {
    return rad * 180 / Math.PI
}

/**
 * cos function using degrees
 * @param {number} deg angle in degrees
 */
export const cosd = (deg) => Math.cos(converToRadian(deg))

/**
 * sin function using degrees
 * @param {number} deg angle in degrees
 */
export const sind = (deg) => Math.sin(converToRadian(deg))

/**
 * sin function using radians
 * @param {number} deg angle in radians
 */
export const sinr = (rad) => Math.sin(rad)


/**
 * cos function using radians
 * @param {number} deg angle in radians
 */
export const cosr = (rad) => Math.cos(rad)


/**
 * Arc sin function returns angle in degrees
 * @param {number} num angle in degrees
 * @returns {number} degrees
 */
export const asind = (num) => converToDegrees(Math.asin(num))

/**
 * Arc tan function returns angle in degrees
 * @param {number} y 
 * @param {number} x 
 * @returns {number} degrees
 */
export const atan2d = (y, x) => converToDegrees(Math.atan2(y, x))


export const square = (num) => Math.pow(num, 2)