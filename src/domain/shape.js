import { isNullOrUndefined } from "../utils/object"
import { arrayHasItems } from "../utils/arrays"

export function Shape({ coords, cutouts }) {
    Object.assign(this, { coords, cutouts })
    this.addCutout = (cutout) => {
        if (isNullOrUndefined(this.cutouts)) {
            this.cutouts = []
        }
        this.cutouts.push(cutout)
    }

    this.addCoord = (coord) => {
        if (isNullOrUndefined(this.coords)) {
            this.coords = []
        }
        this.coords.push(coord)

    }
    
    this.clone = () => {
        return new Shape({
            coords: arrayHasItems(this.coords) ? this.coords.map(coord => coord.clone()) : null,
            cutouts: arrayHasItems(this.cutouts) ? this.cutouts.map(cutout => cutout.clone()) : null
        })

    }
}