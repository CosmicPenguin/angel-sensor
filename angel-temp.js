// angel-temp.js
// Connect to the Angel Sensor and print the skin temperature in real-time
//
// Jordan Crouse <jordan+github@cosmicpenguin.net>
// Licensed under the MIT license

var angelID = process.argv[2].toLowerCase();

var AngelDevice = require('./lib/angel-device');
var NobleDevice = require('noble-device');
var ThermometerDevice = require('./lib/thermometer-service');

NobleDevice.Util.mixin(AngelDevice, ThermometerDevice);

console.log("scanning for Angel Sensor.  You may have to press the button...");

function connected(device) {
	console.log("Found Angel Sensor...");

	device.on('disconnect', function() {
		process.exit(0);
	});

	device.on('tempChange', function(data, isFahrenheit) {
		var units = isFahrenheit ? 'F' : 'C';
		console.log("Skin temperature: " + data.toFixed(2) + units);
	});

	device.connectAndSetUp(function(err) {
		device.notifyTemp(function(counter) {
			console.log('Watching temperature. Ctrl-C to cancel...');
		});
	});
}

AngelDevice.connectAngel(angelID, connected);
