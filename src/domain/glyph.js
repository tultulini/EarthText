import { shapeFromDTO } from "./shape"
import { Boundary } from "./boundary"
import { arrayHasItems } from "../utils/arrays"

export function Glyph({ shapes, boundary, name }) {
    Object.assign(this, { shapes, boundary, name })
}

export const glyphFromDto = (dto, name) => {
    const shapes = arrayHasItems(dto.shapes)
        ? dto.shapes.map(s => shapeFromDTO(s))
        : null
    const boundary = new Boundary(dto.boundary)
    return new Glyph({ shapes, boundary, name })
}