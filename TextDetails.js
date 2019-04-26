class TextDetails
{
	/**
	 * 
	 * @param {String} text 
	 * @param {FontDetails} fontDetails 
	 * @param {Position} position 
	 * @param {String} color
	 */
	constructor (text, fontDetails, position, color)
	{
		this.text = text;
		this.fontDetails = fontDetails;
		this.position = position;
		this.color = color;

	}

	get isDrawCircle(){
		return this.text.toLocaleLowerCase().indexOf("\\c");
	}
	get units(){
		
	}
}
module.exports = TextDetails;