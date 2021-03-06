PIR Motion Detector
===

Node library for PIR sensor

**For Tessel 1, use version 0.1.0 of this package.**

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

* +5V on the PIR goes to 5V. [Here](https://forums.tessel.io/t/accessing-5v-on-tessel-2-powering-tessel-2-with-wires/2368) is a post on how to access 5V on Tessel 2.
* GND goes to GND on the Tessel port you are using.
* OUT, the signal pin, goes to any of Tessel's [various digital pins](https://tessel.gitbooks.io/t2-docs/content/API/Hardware_API.html#pin-mapping). Note that the signal works on a maximum of 3.3V.

I've left the PIR sensor in the retriggering position ([H for the Adafruit one](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/testing-a-pir)), so the signal pin will be pulled high as long as the sensor detects movement.


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

const tessel = require('tessel');
const pir = require('pir').use(tessel.port.A.pin[2]);

pir.on('ready', pir => {
  console.log('Ready and waiting...');
  pir.on('movement:start', time => {
    console.log(`Something moved! Time ${time}`);
  });
  pir.on('movement:end', time => {
    console.log(`All is still. Time ${time}`);
  });
});
```

## Methods

&#x20;<a href="#api-pir-read-callback-data" name="api-pir-read-callback-data">#</a> pir<b>.read</b>( [callback(data)] )  
Reads the value of the pin: 1 for movement; 0 for stillness. Returns the value or outputs to callback.


## Events


&#x20;<a href="#api-pir-on-ready-callback-err-pir" name="api-pir-on-ready-callback-err-pir">#</a> pir<b>.on</b>( 'ready', callback(err, pir) )  
Emitted when the pir object is first initialized

&#x20;<a href="#api-pir-on-movement-callback-time" name="api-pir-on-movement-callback-time">#</a> pir<b>.on</b>( 'movement', callback(time) )  
Emitted when movement is first detected.

&#x20;<a href="#api-pir-on-movement-start" name="api-pir-on-movement-start">#</a> pir<b>.on</b>( 'movement:start', callback(time) )  
Alias of `movement`.

&#x20;<a href="#api-pir-on-stillness-callback-time" name="api-pir-on-stillness-callback-time">#</a> pir<b>.on</b>( 'stillness', callback(time) )  
Emitted at the onset of stillness.

&#x20;<a href="#api-pir-on-movement-end" name="api-pir-on-movement-end">#</a> pir<b>.on</b>( 'movement:end', callback(time) )  
Alias of `stillness`.

&#x20;<a href="#api-pir-on-change-callback-time-value" name="api-pir-on-change-callback-time-value">#</a> pir<b>.on</b>( 'change', callback(time, value) )  
Emitted whenever the state changes. `value` is the pin.read value after the change.

## Properties

&#x20;<a href="#api-pir-movement" name="api-pir-movement">#</a> pir<b>.movement</b>  
`true` while movement detected; `false` while no movement detected


## Licensing

Copyright Kelsey Breseman, Apache 2.0 Licensed.
