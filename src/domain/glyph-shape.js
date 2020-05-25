import { isNullOrUndefined } from "../utils/object"

export function GlyphShape({ coords, cutouts }) {
    Object.assign(this, { coords, cutouts })
    this.addCutout = (cutout) => {
        if (isNullOrUndefined(this.cutouts)) {
            this.cutouts = []
        }
        this.cutouts.push(cutout)
    }
    this.addCoord = (coord)=>{
        if (isNullOrUndefined(this.coords)) {
            this.coords = []
        }
        this.coords.push(coord)

    }
}