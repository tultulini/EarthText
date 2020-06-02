const Codes = {
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    InternalServerError: 500
}
export function createResponse(code, body) {
    const date = new Date()
    const newDate = new Date(date.setMonth(date.getMonth()+8));
    return {
        statusCode: code,
        body: body ? JSON.stringify(body) : null,
        // cookie:`token=bla;expires:${newDate.toISOString()};secure;HttpOnly;`
    }
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