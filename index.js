// Requires
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor function
function PIR (hardware, callback) {
  var self = this;

  // Set properties
  self.hardware = hardware; // Hardware should be a specific pin for PIR
  self.movement = false; // Initialize as not moving
  self.state = 'stillness'; // Initialize as still;

  self.hardware.on('change', function () {
    self.movement = !self.movement; // toggle current value
    self.state = self.movement ? 'movement' : 'stillness'; // update state

    self.emit('change');
  });

  // Emit the ready event
  setImmediate(function emitReady() {
    self.emit('ready', self);
    if(callback) {
      callback(null, self);
    }
  });
}

// Inherit event emission
util.inherits(PIR, EventEmitter);

// Functions
// Read the state of the pin
PIR.prototype.read = function (callback) {
  if(callback) {
    callback(this.hardware.read());
  }
  return this.hardware.read();
};

// Standard Tessel use function
function use (hardware, callback) {
  return new PIR(hardware, callback);
}

// Exports
exports.PIR = PIR;
exports.use = use;
