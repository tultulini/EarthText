import { isNullOrUndefined } from "./object"


/**
 * Checks if function result is async or not (promise) so you can decide if to await it or not
 * @param {any} fnReturnValue The value returned from calling the function
 * @returns {boolean} is asynchronous or not
 */
export const isAsyncFunctionResult = (fnReturnValue) => {
    if (isNullOrUndefined(fnReturnValue) || typeof fnReturnValue !== "object") {
        return false
    }
    return fnReturnValue[Symbol.toStringTag] === "Promise"
}
