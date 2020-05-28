import { arrayHasItems } from "../utils/arrays"

export function Cutout({ coords }) {
    Object.assign(this, {coords})
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