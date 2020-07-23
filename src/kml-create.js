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
        { "text": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "lat": "49.95", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Black" },
        { "text": "abcdefghijklmnopqrstuvwxyz", "lat": "49.9", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Blue" },
        { "text": "123456789", "lat": "49.85", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Cyan" },
        { "text": "~@!#$%^&*()-_=+[{]}\\;:\"\",<.>/", "lat": "49.8", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Green" },
        { "text": "Rotate 45 derees", "lat": "49.65", "lon": "-100", "scaleFactor": 1, "rotate": 45, "color": "Magenta" },
        { "text": "Double Size", "lat": "49.5", "lon": "-100", "scaleFactor": 2, "rotate": 0, "color": "Orange" },
        { "text": "Red Colour", "lat": "49.45", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Red" },
        { "text": "White Colour", "lat": "49.4", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "White" },
        { "text": "Yellow Colour", "lat": "49.35", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Yellow" },
        { "text": "This Text is Left Justified\nAnd Has 2Lines", "lat": "49.3", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Green", "justify": "Left" },
        { "text": "This Textis Right Justified\nAnd Has\n3 Lines", "lat": "49.2", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Cyan", "justify": "Right" },
        { "text": "This Text is Centered\nBut Only Has 2 Lines", "lat": "49", "lon": "-100", "scaleFactor": 1, "rotate": 0, "color": "Yellow", "justify": "Centre" }
    ]
}
const renderPlan = {
	"planName": "athabasca bold",
	"font": "athabasca bold",
	"actions": [{
		"text": "4B",
		"lat": "N46°8'50.77\"","lon":"W66°14'41.05\"",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "5B",
		"lat": " 46°4'20.29\"N","lon":"65°55'42.05\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "5A",
		"lat": " 46°4'43.20\"N","lon":"66°2'17.55\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "3B",
		"lat": " 46° 3'18.88\"N","lon":"66°16'14.02\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "3A",
		"lat": " 46° 3'31.11\"N","lon":"66\°27'34.12\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "4A",
		"lat": " 46°10'22.73\"N","lon":"66°31'24.33\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "2A",
		"lat": " 46°12'9.01\"N","lon":"66°42'36.78\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "2B",
		"lat": " 46° 3'45.06\"N","lon":"66°40'7.44\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "1A",
		"lat": " 46° 6'19.53\"N","lon":"66°49'36.71\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "1B",
		"lat": " 46° 0'52.21\"N","lon":"66°45'49.87\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "1C",
		"lat": " 45°59'15.62\"N","lon":"67°0'15.82\"W",
		"scaleFactor": 0.75,
		"rotate": 0,
		"color": "Blue",
		"justify": "Centre"
	},
	{
		"text": "TRAINING FROM 6000 ASL AND BELOW. MONITOR 122.75",
		"lat": " 46°12'38.26\"N","lon":"66°19'19.41\"W",
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