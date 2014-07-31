var tessel = require('tessel');
var pir = require('../').use(tessel.port['GPIO'].pin['G3'], function (err, thing) {
  console.log(thing)
});

pir.on('ready', function (pir) {
  console.log('ready');
  console.log(pir)
});

pir.on('error', function (err) {
  console.log(err);
});
