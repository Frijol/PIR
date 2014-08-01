/*********************************************
This basic PIR example emits events when
a body is detected and when a body exits
the field.
*********************************************/

var tessel = require('tessel');
var pir = require('../').use(tessel.port['GPIO'].pin['G3']);

pir.on('ready', function (pir) {
  console.log('Ready and waiting...');
  pir.on('movement', function (time) {
    console.log('Something moved! Time ' + time);
  });
  pir.on('stillness', function (time) {
    console.log('All is still. Time ' + time);
  });
});

pir.on('error', function (err) {
  console.log(err);
});
