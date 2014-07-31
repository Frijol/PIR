var tessel = require('tessel');
var pir = require('../').use(tessel.port['D'].pin['G1']);

pir.on('ready', function () {
  console.log('ready');
});