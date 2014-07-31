var tinytap = require('tinytap');
var async = require('async');

var tessel = require('tessel');
var pirLib = require('../');

var port = process.argv[2] || 'GPIO';
var signalPin = process.argv[3] || 'G3';

var pir;

test.count(1);

async.series([
  // Test connecting
  
  ]);