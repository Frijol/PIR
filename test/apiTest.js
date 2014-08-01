var test = require('tinytap');
var async = require('async');

var tessel = require('tessel');
var pirLib = require('../');

var portname = process.argv[2] || 'GPIO';
var pinname = process.argv[3] || 'G3';

var timeout = 1000;
var pir;

test.count(4);

async.series([
  test('Connecting to PIR', function (t) {
    var readyTimer = setTimeout(function () {
      t.ok(false, 'Failed to emit ready event in a reasonable amount of time.');
      t.end();
    }, timeout);
    pir = pirLib.use(tessel.port[portname].pin[pinname], function (err, pir) {
      // t.ok(pir, 'The PIR object was not returned.');
      // t.equal(err, undefined, 'There was an error connecting to the PIR module: ' + err);
      pir.on('ready', function () {
        clearTimeout(readyTimer);
        t.ok(true, 'Ready was emitted.');
      });
    });
    pir.on('error', function (error) {
      t.ok(false, 'Error caught: ' + error);
      t.end();
    });
  }),
  
  test('Read function', function (t) {
    pir.read(function (data) {
      t.ok((data === 0) || (data === 1), 'Read should return 0 or 1 (callback value).');
    });
    t.ok((pir.read() === 0) || (pir.read() === 1), 'Read should return 0 or 1 (returned value).');
  })
  
  ]);