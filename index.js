// Requires
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor function
function PIR (hardware, callback) {
  
}

// Inherit event emission
util.inherits(PIR, EventEmitter);

// Functions

// Standard Tessel use function
function use (hardware, callback) {
  
}

// Exports
exports.PIR = PIR;
exports.use = use;