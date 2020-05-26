import { join } from 'path'
import { isNullOrWhiteSpace } from './utils/strings'
export const getResourcesPath = (fileName, direcotyPath) => {
    const relFilePath = isNullOrWhiteSpace(direcotyPath)
        ? fileName
        : join(direcotyPath, fileName)
    return join(process.cwd(), 'resources', relFilePath)
}