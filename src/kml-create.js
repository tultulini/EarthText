import { writeFileSync } from 'fs'
import { getResourcesPath } from "./config"
import { debugLog } from "./utils/log"
import { handle } from "./rest/layers/post"

// "athabasca bold"

// "avenir roman":

const renderPlan = {
    "planName": 'athabasca bold',
    "font": "athabasca bold",
    "actions": [
        { "text": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "latString": "49.95", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Black" },
        { "text": "abcdefghijklmnopqrstuvwxyz", "latString": "49.9", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Blue" },
        { "text": "123456789", "latString": "49.85", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Cyan" },
        { "text": "~@!#$%^&*()-_=+[{]}\\;:\"\",<.>/", "latString": "49.8", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Green" },
        { "text": "Rotate 45 derees", "latString": "49.65", "lonString": "-100", "scaleFactor": 1, "rotate": 45, "color": "Magenta" },
        { "text": "Double Size", "latString": "49.5", "lonString": "-100", "scaleFactor": 2, "rotate": 0, "color": "Orange" },
        { "text": "Red Colour", "latString": "49.45", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Red" },
        { "text": "White Colour", "latString": "49.4", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "White" },
        { "text": "Yellow Colour", "latString": "49.35", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Yellow" },
        { "text": "This Text is Left Justified\nAnd Has 2Lines", "latString": "49.3", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Green", "justify": "Left" },
        { "text": "This Textis Right Justified\nAnd Has\n3 Lines", "latString": "49.2", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Cyan", "justify": "Right" },
        { "text": "This Text is Centered\nBut Only Has 2 Lines", "latString": "49", "lonString": "-100", "scaleFactor": 1, "rotate": 0, "color": "Yellow", "justify": "Centre" }
    ]
}

const getFileName = () => {
    const today = new Date()
    const fileName = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.kml`
    return fileName
}

const createKml = async () => {
    const kmlData = await handle({ body: JSON.stringify(renderPlan, null, '\t') })
    const filePath = getResourcesPath(getFileName())
    writeFileSync(filePath, kmlData.body)
    debugLog(`kml created: ${filePath}`)
}

createKml()