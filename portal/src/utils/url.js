import { safeLength } from "./strings"
import { parse } from 'querystring'
const MIN_SEARCH_LEN = 2
export const getQuerystringParam = (param) => {
    const search = window.location.search
    console.log(`search: ${search}`)
    if (safeLength(search) < MIN_SEARCH_LEN) {
        console.log(`too short: ${safeLength(search)}`)

        return null
    }
    console.log(`long enough`)
    const query = parse(search.substr(1))
    return query[param]
}