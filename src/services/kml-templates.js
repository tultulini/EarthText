import { getS3BucketName } from '../config'
import { getTextFile } from './accessors/s3'
import { isSomething } from '../utils/object'

const templateCache = {}

export const getTemplate = async (templateFileName) => {
    const filePath = `kml-templates/${templateFileName}`
    if (isSomething(templateCache[filePath])) {
        return templateCache[filePath]
    }
    const template = await getTextFile(filePath, getS3BucketName())
    templateCache[filePath] = template
    return template
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
        PolygonName: "~~~POLYGON_NAME~~~",
        Style: "~~~POLYGON_STYLE~~~",
        OuterBoundariesCoords: "~~~OUTER_BOUNDARY_COORDS~~~",
        InnerPolygons: "~~~INNER_POLYGONS~~~"
    },
    InnerPolygonCoords: "~~~INNER_BOUNDARY_COORDS~~~"
}