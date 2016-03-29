angel-sensor
============

A suite of node.js tools for the [Angel Sensor](http://angelsensor.com/).

## Install
```
npm install
```

## Usage

Refer to the [noble](https://github.com/sandeepmistry/noble) README for details
and instructions about USB dongles. I use the built in Bluetooth in my Thinkpad
with Fedora 20 and it works great.  In particular, if you don't want to use
root, pay attention to this [segment of the noble
README](https://github.com/sandeepmistry/noble#running-on-linux).

For all the tools, the Angel Sensor must be in BLE mode. If it isn't quickly
found, press the button on the top of the sensor (by the logo).  The dongle
will vibrate and then it should be found.

The ID will be the ID of your dongle without colons and lowercase letters. Discover it with hcitool:

```
$ sudo hcitool lescan
88:C6:26:17:49:08 
A4:77:33:6A:08:9D (unknown)
00:07:80:03:12:FE Angel Sensor 05922
00:07:80:03:12:FE (unknown)
F9:24:0F:28:E0:D6 (unknown)
```

So for the examples below, my id is: '0007800312fe'.

### angel-battery.js

```
node angel-battery.js [id]
```

Shows the current battery level of the sensor (in %).

### angel-heart-rate.js

```
node angel-heart-rate.js [id]
```

After it calibrate it will show you your heart rate in realtime. The
notifications are irregular but it should update frequently.

### angel-temp.js

```
node angel-heart-rate.js <id>
```

After it calibrates it will show your your skin temperature with periodic
updates.

## Details

These tools use the
[noble-device](https://github.com/sandeepmistry/noble-device) framework to
define the BLE services. Some of them (heartbeat, battery, device information)
are built into noble-device, and the others (thermometer and the still nonworking
blood oxygen services) are located in lib/.  Thermometer is a standard Bluetooth
service and I'll be submitting to noble-device, while all the others are from
Seraphim Sense and will be sticking around here at least for the near term.
