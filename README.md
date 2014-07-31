PIR
===

Node library for PIR sensor

I used [this one](http://www.adafruit.com/products/189) from Adafruit.

Adafruit has a lovely writeup on how PIRs work; I encourage you to read the details [here](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/how-pirs-work). Here are some of the key pieces of information:

* IR detects warm bodies.
* There are two beams of IR sensitivity on the PIR.
* If both beams detect the same amount of IR, the sensor records that no warm bodies are present.
* When a warm body enters the field, the sensor records a positive charge differential.
* When a warm body leaves the field, the sensor records a negative charge differential.

The PIR I used has three pins. Here's how you connect it to Tessel:

* +5V on the PIR goes to Vin on Tessel's GPIO bank (this pin is 5V when Tessel is powered over USB)
* GND goes to any of the various GND pins on Tessel. There's one right next to Vin on the GPIO bank.
* OUT, the signal pin, goes to any of Tessel's various digital (G) pins. Note that the signal works on a maximum of 3.3V.

I've left the PIR sensor in the retriggering position ([H for the Adafruit one](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/testing-a-pir)), so the signal pin will be pulled high as long as the sensor detects movement.