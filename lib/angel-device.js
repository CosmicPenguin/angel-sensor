// angel-device.js
//
// Jordan Crouse <jordan@cosmicpenguin.net>
// Licensed under the MIT license

var NobleDevice = require('noble-device');

var AngelDevice = function(device) {
	NobleDevice.call(this, device);
}

AngelDevice.is = function(device) {
	return device.id === this.id;
}

NobleDevice.Util.inherits(AngelDevice, NobleDevice);

AngelDevice.connectAngel = function(id, callback) {
	this.id = id;
	this.discover(callback);
}

module.exports = AngelDevice;
