export function Cutout({ coords }) {
    Object.assign(this, coords)
    this.addCoord = (coord)=>{
        if (isNullOrUndefined(this.coords)) {
            this.coords = []
        }
        this.coords.push(coord)

    }
}