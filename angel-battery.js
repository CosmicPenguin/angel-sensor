// angel-battery.js
// Print the battery level of your Angel Sensor
//
// Jordan Crouse <jordan+github@cosmicpenguin.net>
// Licensed under the MIT license

var angelID = process.argv[2].toLowerCase();

var AngelDevice = require('./lib/angel-device');
var NobleDevice = require('noble-device');

NobleDevice.Util.mixin(AngelDevice, NobleDevice.BatteryService);

console.log("scanning for Angel Sensor.  You may have to press the button...");

function connected(device) {
	console.log("Found Angel Sensor...");

	device.on('disconnect', function() {
		process.exit(0);
	});

	device.connectAndSetUp(function(err) {
		device.readBatteryLevel(function (err, value) {
			console.log('Battery Level: ' + value + '%');
			device.disconnect();
		});
	});
}

AngelDevice.connectAngel(angelID, connected);
