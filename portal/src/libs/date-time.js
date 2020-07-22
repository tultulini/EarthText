
const MILISECONDS_IN_SECOND = 1000
export function getCurrentUTCUnixTimeSeconds() {
    var utcTimestamp = getUTCUnixTime(new Date())
    return parseInt(utcTimestamp / MILISECONDS_IN_SECOND)
}


export function getUTCUnixTime(date) {

    var utcTimestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    return utcTimestamp
}
