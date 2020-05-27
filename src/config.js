import { join } from 'path'
import { Coordinate } from './domain/coordinate'
import { isNullOrWhiteSpace } from './utils/strings'
export const getFontDirectoryName = () => join('Fonts', 'Font')



export const getCirclePointsCount = () => 36

export const getOriginCoordinate = () => new Coordinate({ lat: 50, lon: -100 })

export const getResourcesPath = (fileName, direcotyPath) => {
    const relFilePath = isNullOrWhiteSpace(direcotyPath)
        ? fileName
        : join(direcotyPath, fileName)
    return join(process.cwd(), 'resources', relFilePath)
}