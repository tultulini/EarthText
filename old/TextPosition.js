class TextPosition
{
	/**
	 * 
	 * @param {number} latitude 
	 * @param {number} longtitude 
	 * @param {number} scale 
	 * @param {number} rotate 
	 * 
	 */
	constructor (latitude, longtitude, scale, rotate)
	{
		this.latitude = latitude;
		this.longtitude = longtitude;
		this.scale = scale;
		this.rotate = rotate;
	}
}
module.exports = TextPosition;