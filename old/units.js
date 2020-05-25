const Types = { nauticalMiles: 'nm', kilometers: 'km', meters: 'm', statueMile:'sm' };

class Units
{
	static get Types() { return Types; }
	/**
	 * 
	 * @param {number} length 
	 * @param {string} units 
	 */
	convertToKiloMeters(length, units)
	{
		switch (units)
		{
			case Types.kilometers:
				return length;
				case Types.nauticalMiles:

		}
	}
}
module.exports = Units 
