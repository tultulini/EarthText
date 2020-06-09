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
                        latString: {
                            type: "string"
                        },
                        lonString: {
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
                    required: ["text", "latString", "lonString", "scaleFactor", "rotate", "color"]
                }
            }
        },
        required: ["actions"]
    }
}