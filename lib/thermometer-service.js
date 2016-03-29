var THERMOMETER_SERVICE_UUID = '1809';
var MEASUREMENT_UUID                    = '2a1c';

function ThermometerService() {
}

ThermometerService.prototype.notifyTemp = function(callback) {
	this.onTempChangeBinded = this.onTempChange.bind(this);
	this.notifyCharacteristic(THERMOMETER_SERVICE_UUID, MEASUREMENT_UUID, true, this.onTempChangeBinded, callback);
};

ThermometerService.prototype.unnotifyTemp = function(callback) {
	this.notifyCharacteristic(THERMOMETER_SERVICE_UUID, MEASUREMENT_UUID, false, this.onTempChangeBinded, callback);
};

ThermometerService.prototype.onTempChange = function(data) {
	this.convertTemp(data, function(counter) {
		this.emit('tempChange', counter);
  	}.bind(this));
};

ThermometerService.prototype.readTemp = function(callback) {
	this.readDataCharacteristic(THERMOMETER_SERVICE_UUID, MEASUREMENT_UUID, function(error, data) {
		if (error) {
			return callback(error);
    		}

		this.convertTemp(data, function(counter) {
			callback(null, counter);
		});
  	}.bind(this));
};

ThermometerService.prototype.convertTemp = function(data, callback) {

	var flags = data.readUInt8(0);

	// Format is a IEEE 11073 - mantissa is lower 24 bits, exponent is 8
	// bits.  This is super fast and dirty and assumes a real number

	var raw = data.readUInt32LE(1);
	var exp = ((raw >> 24) & 0xFF) << 24 >> 24;
	var mantissa = raw & 0xFFFFFF;
	var temp = mantissa * Math.pow(10, exp);

	callback(temp, flags & 0x01 ? true : false);
};

module.exports = ThermometerService;
