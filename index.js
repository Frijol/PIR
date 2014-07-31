// Requires
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor function
function PIR (hardware, callback) {
  var self = this;
  
  // Check to ensure proper hardware has been passed in
  if (typeof hardware.pin != 'number') {
    // Pin not specified
    var error = new Error("Specify a pin, e.g. tessel.port['GPIO'].pin['G3']");
    self.emit('error', error);
    return error;
  } else if (! hardware.pin in [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 34, 35, 36, 37, 38, 39]) {
    // Not a digital pin
    var error = new Error('Specified pin is not a digital pin.');
    self.emit('error', error);
  }
  
  self.hardware = hardware; // Hardware should be a specific pin for PIR
  
  self.listening = true;
  
  self.emit('ready',  self);
  if(callback) {
    callback(null, self);
  }
}

// Inherit event emission
util.inherits(PIR, EventEmitter);

// Functions
// Enable re-enables event emission after a disable call.
PIR.prototype.enable = function (callback) {
  var self = this;
  self.listening = true;
  
  while(self.listening) {
    self.hardware.on('rise', function (time) {
      self.emit('movement', time);
    });
    
    self.hardware.on('fall', function (time) {
      self.emit('stillness', time);
    });
    
    self.hardware.on('change', function (time, type) {
      self.emit('change', time, type);
    });
  }
  
  if(callback) {
    callback();
  }
};

// Disable mutes event emission
PIR.prototype.disable = function (callback) {
  self.listening = false;
  if(callback) {
    callback();
  }
};

// Read the state of the pin
PIR.prototype.read = function (callback) {
  callback(this.hardware.read);
};

// Standard Tessel use function
function use (hardware, callback) {
  return new PIR(hardware, callback);
}

// Exports
exports.PIR = PIR;
exports.use = use;