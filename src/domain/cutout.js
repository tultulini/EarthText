export function Cutout({ coords }) {
    Object.assign(this, coords)
    this.addCoord = (coord) => {
        if (isNullOrUndefined(this.coords)) {
            this.coords = []
        }
        this.coords.push(coord)

    }
    this.clone = () => {
        return new Cutout({
            coords: arrayHasItems(this.coords) ? this.coords.map(coord => coord.clone()) : null

        })
    }
}