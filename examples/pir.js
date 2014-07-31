var tessel = require('tessel');
var pir = require('../').use(tessel.port['GPIO'].pin['G3']);

pir.on('ready', function () {
  
});