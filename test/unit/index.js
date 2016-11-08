"use strict";

const EventEmitter = require('events').EventEmitter;

const sinon = require('sinon');
const exported = require('../../');


const sandbox = sinon.sandbox.create();
const hardware = new EventEmitter();

exports['PIR'] = {
  setUp(done) {
    this.spy = sandbox.spy();
    this.pir = new exported.PIR(hardware, this.spy);

    done();
  },

  tearDown(done) {
    sandbox.restore();
    done();
  },

  isFunction(test) {
    test.expect(1);
    test.equal(typeof exported.PIR, 'function');
    test.done();
  },

  ready(test) {
    test.expect(3);

    this.spy = sandbox.spy((error, sensor) => {
      test.equal(error, null);
      test.equal(sensor, this.pir);
      test.done();
    });

    this.pir = new exported.PIR(hardware, this.spy);

    this.pir.on('ready', sensor => {
      test.equal(sensor, this.pir);
    });
  },

  movement(test) {
    test.expect(3);

    test.equal(this.pir.movement, false);

    hardware.emit('rise');

    test.equal(this.pir.movement, true);

    hardware.emit('fall');

    test.equal(this.pir.movement, false);

    test.done();
  },

  eventMovement(test) {
    test.expect(3);

    test.equal(this.pir.movement, false);

    this.spy.reset();

    this.pir.on('movement', this.spy);

    hardware.emit('rise');

    test.equal(this.spy.callCount, 1);
    test.equal(this.pir.movement, true);
    test.done();
  },

  eventStillness(test) {
    test.expect(2);


    this.pir.movement = true;

    this.spy.reset();

    this.pir.on('stillness', this.spy);

    hardware.emit('fall');

    test.equal(this.spy.callCount, 1);
    test.equal(this.pir.movement, false);
    test.done();
  },

  eventChange(test) {
    test.expect(1);

    this.spy.reset();

    this.pir.on('change', this.spy);

    hardware.emit('change');

    test.equal(this.spy.callCount, 1);
    test.done();
  },
};

exports['use'] = {
  setUp(done) {

    this.spy = sandbox.spy();
    done();
  },

  tearDown(done) {
    sandbox.restore();
    done();
  },

  isFunction(test) {
    test.expect(1);
    test.equal(typeof exported.use, 'function');
    test.done();
  },

  returnsPIRInstance(test) {
    test.expect(1);

    const pir = exported.use(hardware, this.spy);

    test.equal(pir instanceof exported.PIR, true);
    test.done();
  },
};

