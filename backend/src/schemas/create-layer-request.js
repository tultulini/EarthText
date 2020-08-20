export const getCreateLayerRequestSchema = () => {
    return {
        type: "object",
        properties: {
            planName: {
                type: "string"
            },
            font: {
                type: "string"
            },
            actions: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        text: {
                            type: "string"
                        },
                        lat: {
                            type: "string"
                        },
                        lon: {
                            type: "string"
                        },
                        scaleFactor: {
                            type: "number"
                        },
                        rotate: {
                            type: "number"
                        },
                        color: {
                            type: "string"
                        }
                    },
                    required: ["text", "lat", "lon", "scaleFactor", "rotate", "color"]
                }
            }
        },
        required: ["actions"]
    }
}