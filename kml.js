const fs = require('fs');
const deserializer = require('xml2js');
class kml
{
	constructor (filePath)
	{
		this.loadFromFile(filePath);
	}

	async loadFromFile(filePath)
	{
		let xml = fs.readFileSync(filePath, "utf8");
		deserializer.parseString(xml, (err, result) =>
		{
			if (err)
			{
				throw new Error(err);
			}
			let kml = result.kml;
			if (!kml)
			{
				throw new Error("Couldn't find kml node")
			}
			for (let element in kml)
			{
				this[element] = kml[element];
			}

		})



	}


}

module.exports = kml;