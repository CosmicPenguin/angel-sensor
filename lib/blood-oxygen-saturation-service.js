// blood-oxygen-saturation-service.js
//
// Jordan Crouse <jordan@cosmicpenguin.net>
// Licensed under the MIT license

var BLOOD_OXYGEN_SERVICE_UUID = '902dcf38ccc04902b22c70cab5ee5df2';
var MEASUREMENT_UUID = 'b269c33fdf6b4c32801d1b963190bc71';

function BloodOxygenService() {
}

BloodOxygenService.prototype.notifyBloodOxygen = function(callback) {
	this.onOxyChangeBinded = this.onBloodOxygenChange.bind(this);
	this.notifyCharacteristic(BLOOD_OXYGEN_SERVICE_UUID, MEASUREMENT_UUID, true, this.onOxyChangeBinded, callback);
};

BloodOxygenService.prototype.unnotifyBloodOxygen = function(callback) {
	this.notifyCharacteristic(BLOOD_OXYGEN_SERVICE_UUID, MEASUREMENT_UUID, false, this.onOxyChangeBinded, callback);
};

BloodOxygenService.prototype.onBloodOxygenChange = function(data) {
	this.convertBoodOxygen(data, function(counter) {
		this.emit('bloodOxygenChange', counter);
	}.bind(this));
};

BloodOxygenService.prototype.readBloodOxygen = function(callback) {
	this.readDataCharacteristic(BLOOD_OXYGEN_SERVICE_UUID, MEASUREMENT_UUID, function(error, data) {
		if (error) {
			return callback(error);
		}

		this.convertBloodOxygen(data, function(counter) {
			callback(null, counter);
    		});
  	}.bind(this));
};

BloodOxygenService.prototype.convertBloodOxygen = function(data, callback) {

	// value is a IEEE 11073 - mantissa is lower 24 bits, exponent is 8
	// bits.  This is super fast and dirty and assumes a real number

	var raw = data.readUInt32LE(0);
	var exp = ((raw >> 24) & 0xFF) << 24 >> 24;
	var mantissa = raw & 0xFFFFFF;
	var oxy = mantissa * Math.pow(10, exp);

	callback(oxy);
};

module.exports = BloodOxygenService;
