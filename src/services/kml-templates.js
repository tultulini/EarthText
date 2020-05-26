import { readFileSync } from 'fs'
import { getResourcesPath } from '../system'
export const getTemplate = (templateFileName) => {
    const filePath = getResourcesPath(templateFileName)
    return readFileSync(filePath).toString()
}

export const KMLTemplateFiles = {
    Header: "KMLHeaderTemplate.txt",
    Footer: "KMLFooterTemplate.txt",
    PolygonsPlacemark: "KMLPolygonsPlacemarkTemplate.txt",
    InnerPolygon: "KMLInnerPolygonTemplate.txt"
}

export const KMLTemplatePlaceHolders = {
    HeaderFileName: "~~~KMLFileName~~~",
    PolygonsPlacemark: {
        FileName: "~~~KMLFileName~~~",
        Style: "~~~POLYGON_STYLE~~~",
        OuterBoundariesCoords: "~~~OUTER_BOUNDARY_COORDS~~~",
        InnerPolygons: "~~~INNER_POLYGONS~~~"
    },
    InnerPolygonCoords: "~~~INNER_BOUNDARY_COORDS~~~"
}