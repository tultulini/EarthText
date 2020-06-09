import { isNullOrUndefined } from "./object"

const Codes = {
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    InternalServerError: 500
}

export function createResponse(code, body) {
    return {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: stringifyBody(body)
    }
}

function stringifyBody(body) {
    if (isNullOrUndefined(body))
        return null
    if (typeof body === "string") {
        return body
    }
    return JSON.stringify(body)
}

export function badRequestResponse(message) {
    return createResponse(Codes.BadRequest, message || "Bad request")

}

export function okResponse(body) {
    return createResponse(Codes.OK, body)
}

export function unauthorizedResponse() {
    return createResponse(Codes.Unauthorized, "Request Unauthorized")
}

export function notFoundResponse() {
    return createResponse(Codes.NotFound, "Couldn't find resource")
}

export function internalServerErrorResponse(message) {
    return createResponse(Codes.InternalServerError, message || "Request failed due to internal server error")
}