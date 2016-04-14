PIR Motion Detector
===

Node library for PIR sensor

I used [this one](http://www.adafruit.com/products/189) from Adafruit.

Adafruit has a lovely writeup on how PIRs work; I encourage you to read the details [here](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/how-pirs-work). Here are some of the key pieces of information:

* IR detects warm bodies.
* There are two beams of IR sensitivity on the PIR.
* If both beams detect the same amount of IR, the sensor records that no warm bodies are present.
* When a warm body enters the field, the sensor records a positive charge differential.
* When a warm body leaves the field, the sensor records a negative charge differential.

## Materials

* [PIR motion detector](http://www.adafruit.com/products/189)
* [Tessel](tessel.io)

## Connecting

The PIR I used has three pins. Here's how you connect it to Tessel:

* +5V on the PIR goes to Vin on Tessel's GPIO bank (this pin is 5V when Tessel is powered over USB)
* GND goes to any of the various GND pins on Tessel. There's one right next to Vin on the GPIO bank.
* OUT, the signal pin, goes to any of Tessel's various digital (G) pins. Note that the signal works on a maximum of 3.3V.

I've left the PIR sensor in the retriggering position ([H for the Adafruit one](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/testing-a-pir)), so the signal pin will be pulled high as long as the sensor detects movement.

### Tessel 1 connection example

![](https://lh3.googleusercontent.com/-Zcmg7NPefAM/U-LafNQe2lI/AAAAAAAAJno/jlCWeBbDWxU/w882-h496-no/20140801_113753.jpg)

In this image, the black wire is ground; the red wire is 5V; and the yellow wire is the signal pin.

This is connected to `tessel.port['GPIO'].pin('G3')`.

### Tessel 2 connection example

![](https://cloud.githubusercontent.com/assets/454690/14521494/dca4d360-0229-11e6-9cb1-c7b8e023b619.png)

In this image, the black box represents a ground wire; the green box represents a wire to 5V; and the yellow box represents a signal wire.

This is connected to `tessel.port['A'].pin[3]`.

On Tessel 2, there is no header already attached to the 5V line, so you will need to solder it. I would recommend purchasing and soldering in a 3x1 .1" female header like [this one](https://www.pololu.com/product/1013) so that you can easily swap your Tessel between this project and others.

There are also other ways to source 5V externally, if you don't have a soldering iron/you're in a hurry. For example, you can plug in the servo module to its wall power, and the + row of pins (the middle row) will give you 5V. It'll look messy, but it will work.

## Installation
```sh
npm install pir
```

## Example
```js
/*********************************************
This basic PIR example emits events when
a body is detected and when a body exits
the field.
*********************************************/

var tessel = require('tessel');
var pir = require('../').use(tessel.port['A'].pin[1]);

pir.on('ready', function (pir) {
  console.log('Ready and waiting...');
  pir.on('movement', function (time) {
    console.log('Something moved! Time ' + time);
  });
  pir.on('stillness', function (time) {
    console.log('All is still. Time ' + time);
  });
});

pir.on('error', function (err) {
  console.log(err);
});
```

## Methods

&#x20;<a href="#api-pir-read-callback-data" name="api-pir-read-callback-data">#</a> pir<b>.read</b>( [callback(data)] )  
Reads the value of the pin: 1 for movement; 0 for stillness. Returns the value or outputs to callback.

## Events

&#x20;<a href="#api-pir-on-error-callback-error" name="api-pir-on-error-callback-error">#</a> pir<b>.on</b>( 'error', callback(error) )  
Emitted on error connecting

&#x20;<a href="#api-pir-on-ready-callback-err-pir" name="api-pir-on-ready-callback-err-pir">#</a> pir<b>.on</b>( 'ready', callback(err, pir) )  
Emitted when the pir object is first initialized

&#x20;<a href="#api-pir-on-movement-callback-time" name="api-pir-on-movement-callback-time">#</a> pir<b>.on</b>( 'movement', callback(time) )  
Emitted when movement is first detected.

&#x20;<a href="#api-pir-on-stillness-callback-time" name="api-pir-on-stillness-callback-time">#</a> pir<b>.on</b>( 'stillness', callback(time) )  
Emitted at the onset of stillness.

&#x20;<a href="#api-pir-on-change-callback-time-value" name="api-pir-on-change-callback-time-value">#</a> pir<b>.on</b>( 'change', callback(time, value) )  
Emitted whenever the state changes. `value` is the pin.read value after the change.

## Properties

&#x20;<a href="#api-pir-movement" name="api-pir-movement">#</a> pir<b>.movement</b>  
`true` while movement detected; `false` while no movement detected

## Licensing
Copyright Kelsey Breseman, Apache 2.0 Licensed.
