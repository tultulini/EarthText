import { arrayHasItems } from "../utils/arrays"
import { Coordinate } from "./coordinate"

export function Cutout({ coords }) {
    Object.assign(this, { coords })
    this.addCoord = (coord) => {
        if (isNullOrUndefined(this.coords)) {
            this.coords = []
        }
        this.coords.push(coord)

    }
    this.clone = () => {
        let newCoords = arrayHasItems(this.coords) ? this.coords.map(coord => coord.clone()) : null
        const cloned = new Cutout({
            coords: arrayHasItems(this.coords) ? this.coords.map(coord => coord.clone()) : null

        })
        return cloned
    }
}

export const cutoutFromDto = dto => {
    const coords = dto.coords.map(c => new Coordinate(c))
    return new Cutout({ coords })
}