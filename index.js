'use strict';

const Emitter = require('events').EventEmitter;

class PIR extends Emitter {
  constructor(hardware, callback) {
    super();

    // Hardware should be a specific pin for PIR
    this.hardware = hardware;
    // Initialize as not moving
    this.movement = false;

    // Begin listening for events
    this.hardware.on('rise', () => {
      const now = Date.now();
      this.movement = true;
      this.emit('movement', now);
      this.emit('movement:start', now);
    });

    this.hardware.on('fall', () => {
      const now = Date.now();
      this.movement = false;
      this.emit('stillness', now);
      this.emit('movement:end', now);
    });

    this.hardware.on('change', state => {
      const now = Date.now();
      this.movement = !!state;
      this.emit('change', now, state);
    });

    setImmediate(() => {
      this.emit('ready', this);
      if (callback) {
        callback(null, this);
      }
    });
  }

  static get PIR() {
    return PIR;
  }

  static use(hardware, callback) {
    return new PIR(hardware, callback);
  }
}

module.exports = PIR;
