export function isNullOrUndefined(val) {
    return val === null || val === undefined
}

export function isSomething(val) {
    return !isNullOrUndefined(val)
}

