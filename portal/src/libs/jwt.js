import { getCurrentUTCUnixTimeSeconds } from "./date-time";
import { safeLength } from "../utils/strings";


const TOKEN_COMPONENT_COUNT = 3
const TOKEN_SIG_DESC_IDX = 0
const TOKEN_DATA_IDX = 1

export const decodeJwt = (jwt) => {

    if (safeLength(jwt) === 0) {

        throw new Error("jwt is null or empty")
    }

    const jwtComponents = jwt.split('.')

    if (jwtComponents.length !== TOKEN_COMPONENT_COUNT) {
        throw new Error("JWT corrupt")
    }

    const json = Object.assign(decodeTokenComponent(jwtComponents[TOKEN_SIG_DESC_IDX]),
        decodeTokenComponent(jwtComponents[TOKEN_DATA_IDX]))
    return json
}

/**
 * Checks if jwt has expired or is about to
 * @param {Object} details
 * @param {number} details.expirationDelta delta to avoid failed requests (expiration during request)
 * @param {string} details.jwt the token
 * @returns {bool}
 */
export function jwtExpired({ expirationDelta, jwt }) {
    const jwtObject = decodeJwt(jwt)

    return jwtObjectExpired({ expirationDelta, jwtObject })
}

/**
 * Checks if jwt has expired or is about to
 * @param {Object} details
 * @param {number} details.expirationDelta delta to avoid failed requests (expiration during request)
 * @param {Object} details.jwtObject decoded jwt
 * @returns {bool}
 */
export function jwtObjectExpired({ expirationDelta, jwtObject }) {

    if (!jwtObject || !jwtObject.exp) {
        throw new Error('JWT Object not valid')
    }
    const currentTime = getCurrentUTCUnixTimeSeconds()
    const expiration = jwtObject.exp - (expirationDelta || 0)
    console.log(`******* jwtObjectExpired - currentTime:${currentTime}, expiration: ${expiration}`);

    return currentTime > expiration
}

function decodeTokenComponent(value) {
    const buff = new Buffer(value, 'base64')
    const text = buff.toString('ascii')
    return JSON.parse(text)
}
