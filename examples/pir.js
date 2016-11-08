/*********************************************
This basic PIR example emits events when
a body is detected and when a body exits
the field.
*********************************************/

const tessel = require('tessel');
const pir = require('../').use(tessel.port.A.pin[2]);

pir.on('ready', pir => {
  console.log('Ready and waiting...');
  pir.on('movement', time => {
    console.log(`Something moved! Time ${time}`);
  });
  pir.on('stillness', time => {
    console.log(`All is still. Time ${time}`);
  });
});
