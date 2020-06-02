import { isNullOrWhiteSpace } from "../../utils/strings";
import { badRequestResponse } from "../../utils/http-response";
import { stringify } from "../../utils/json";

export const handle = async (event) => {
    try {
        if (isNullOrWhiteSpace(event.body)) {
            return badRequestResponse("need body")
        }
        console.log(`event.body: ${event.body}`);
        var dto = JSON.parse(event.body)
        console.log(`dto: ${stringify(dto)}`);
        
        
    }
    catch (error) {
        console.error(`post.handle error: ${error}`)
        return internalServerErrorResponse()
    }
}