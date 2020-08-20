import AWS from 'aws-sdk'
import { errorLog } from '../../utils/log'
import { isSomething } from '../../utils/object'

export const getFile = async (fileName, bucketName) => {
    try {
        const s3 = new AWS.S3()
        const data = await s3.getObject({ Bucket: bucketName, Key: fileName }).promise()
        return data.Body

    } catch (err) {
        const message = `Failed to get: ${fileName} froom ${bucketName}`
        errorLog(message, err)
        throw new Error(message)
    }
}

export const getTextFile = async (fileName, bucketName) => {
    try {
        const buffer = await getFile(fileName, bucketName)

        return isSomething(buffer)
            ? buffer.toString()
            : null

    } catch (err) {
        const message = `Failed to get: ${fileName} froom ${bucketName}`
        errorLog(message, err)
        throw new Error(message)
    }
}