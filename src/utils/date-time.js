export const MILISECONDS_PER_SECOND = 1000
export const SECONDS_PER_MINUTE = 60
export const MILISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILISECONDS_PER_SECOND

export const minutesSince = (dateISO) => {
    const before = Date.parse(dateISO)
    const now = Date.now()
    const minutes = (now - before) / (MILISECONDS_PER_MINUTE)
    return minutes
}


export const minutesSpan = (isoDateStart, isoDateEnd) => {
    const start = Date.parse(isoDateStart)
    const end = Date.parse(isoDateEnd)
    const minutes = (end - start) / (MILISECONDS_PER_MINUTE)
    return minutes
}



export const minutesToMiliseconds = (minutes) => {
    return minutes * MILISECONDS_PER_MINUTE
}

export const secondsToMinutes = (seconds) => { SECONDS_PER_MINUTE * seconds }
export const currentISOTime = _ => (new Date()).toISOString()
