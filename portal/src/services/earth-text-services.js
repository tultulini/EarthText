
export const getKml = async (renderPlan) => {

    try {
        const url = "https://4pomx4bd0l.execute-api.ca-central-1.amazonaws.com/devtultulini/v1/layers"
        const response = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify(renderPlan),
                headers: {
                    'Content-Type': 'application/text'
                }
            })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const kml = await response.text()
        console.log(`kml: ${kml}`);
        return kml
    } catch (err) {
        console.error(`Error occurred: ${err}`)
    }

}