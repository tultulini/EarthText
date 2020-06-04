import { isNullOrWhiteSpace } from "../../utils/strings";
import { badRequestResponse, internalServerErrorResponse, okResponse } from "../../utils/http-response";
import { stringify } from "../../utils/json";
import { errorLog, debugLog } from "../../utils/log";
import jsonSchema from 'jsonschema'
import { getCreateLayerRequestSchema } from "../../schemas/create-layer-request";
import { arrayHasItems } from "../../utils/arrays";
import { createLayer } from "../../layer-create";

const validateDto = (dto) => {
    const validator = new jsonSchema.Validator()
    const validationResult = validator.validate(dto, getCreateLayerRequestSchema())
    if (arrayHasItems(validationResult.errors)) {
        return validationResult.errors.map(err => err.message)
    }
    return null
}

export const handle = async (event) => {
    try {
        if (isNullOrWhiteSpace(event.body)) {
            return badRequestResponse("need body")
        }
        console.log(`event.body: ${event.body}`);
        var dto = JSON.parse(event.body)

        const errors = validateDto(dto)
        if (arrayHasItems(errors)) {
            const message = `Schema validation failed! Errors: ${errors.join(", ")}`
            debugLog(message)
            return badRequestResponse(message)

        }


        const kml = await createLayer(dto)
        return okResponse(kml)

    }
    catch (error) {
        errorLog(`Failed to create layers`, error)
        return internalServerErrorResponse()
    }
}

