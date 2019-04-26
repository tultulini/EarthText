
const fs = require('fs');

const FontDetails = require('./FontDetails');
const TextPosition = require('./TextPosition');
const TextDetails = require('./TextDetails');
start();
function start()
{
	//createTextDetailsSamples();
	//let kml = new kmlContainer('./KmlTemplate.xml');
	let textDetailSamples = loadTextDetailsSamples();
	processTextDetailsSamples(textDetailSamples);

}
function processTextDetailsSamples(textDetailSamples)
{
	let textDetailsCount = textDetailSamples.length;
	for(let i=0;i<textDetailsCount; i++)
	{
		let textDetails = textDetailSamples[i];
		processTextDetails(textDetails);
	}
}
/**
 * 
 * @param {TextDetails} textDetails 
 */
function processTextDetails(textDetails)
{
	if(textDetails.isDrawCircle)
	{
		handleCircleDraw(textDetails);
	}
}

function handleCircleDraw(textDetails)
{
	
}

function loadTextDetailsSamples()
{
	let textSamplesJson = fs.readFileSync('./TextDetailsSamples.json');
	let textSamples = JSON.parse(textSamplesJson);

}
function createTextDetailsSamples()
{
	let fontDetails = new FontDetails('Athabasca Bold Font', 'Athabasca Bold');
	let samples = [
		{ "position": { "latitude": 49.95, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "Black", "text": "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
		{ "position": { "latitude": 49.9, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "Blue", "text": "abcdefghijklmnopqrstuvwxyz" },
		{ "position": { "latitude": 49.85, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "Cyan", "text": "123456789" },
		{ "position": { "latitude": 49.8, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "Green", "text": "~@!#$%^&*()-_=+[{]}\\;:'\",<.> /" },
		{ "position": { "latitude": 49.65, "longtitude": -100, "scale": 1, "rotate": 45 }, "color": "Magenta", "text": "Rotate 45 derees" },
		{ "position": { "latitude": 49.5, "longtitude": -100, "scale": 2, "rotate": 0 }, "color": "Orange", "text": "Double Size" },
		{ "position": { "latitude": 49.45, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "Red", "text": "Red Colour" },
		{ "position": { "latitude": 49.4, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "White", "text": "White Colour" },
		{ "position": { "latitude": 49.35, "longtitude": -100, "scale": 1, "rotate": 0 }, "color": "Yellow", "text": "Yellow Colour" }
	];

	let textDetailsSamples = [];
	for (let i = 0; i < samples.length; ++i)
	{
		let sample = samples[i];
		let position = new TextPosition(sample.position.latitude, sample.position.longtitude, sample.position.scale, sample.position.rotate);
		let textDetails = new TextDetails(sample.text, fontDetails, position, sample.color);
		textDetailsSamples.push(textDetails);
	}

	fs.writeFileSync('./TextDetailsSamples.json', JSON.stringify(textDetailsSamples, null, '\t'));


}
