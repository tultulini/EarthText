import { writeFileSync } from 'fs'
import { getResourcesPath } from "./config"
import { debugLog } from "./utils/log"
import { handle } from "./rest/layers/post"

// "athabasca bold"

// "avenir roman":

const renderPlan2 = {
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
const renderPlan = {
	"planName": "athabasca bold",
	"font": "athabasca bold",
	"actions": [{
		"text": "4B",
		"latString": "N46°8'50.77\"","lonString":"W66°14'41.05\"",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "5B",
		"latString": " 46°4'20.29\"N","lonString":"65°55'42.05\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "5A",
		"latString": " 46°4'43.20\"N","lonString":"66°2'17.55\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "3B",
		"latString": " 46° 3'18.88\"N","lonString":"66°16'14.02\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "3A",
		"latString": " 46° 3'31.11\"N","lonString":"66\°27'34.12\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "4A",
		"latString": " 46°10'22.73\"N","lonString":"66°31'24.33\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "2A",
		"latString": " 46°12'9.01\"N","lonString":"66°42'36.78\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "2B",
		"latString": " 46° 3'45.06\"N","lonString":"66°40'7.44\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "1A",
		"latString": " 46° 6'19.53\"N","lonString":"66°49'36.71\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "1B",
		"latString": " 46° 0'52.21\"N","lonString":"66°45'49.87\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "1C",
		"latString": " 45°59'15.62\"N","lonString":"67°0'15.82\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "TRAINING FROM 6000 ASL AND BELOW. MONITOR 122.75",
		"latString": " 46°12'38.26\"N","lonString":"66°19'19.41\"W",
		"scaleFactor": 0.36,
		"rotate": 12.21,
		"color": "Blue",
		"justify": "Centre"
	},
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