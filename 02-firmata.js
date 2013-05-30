var firmata = require('firmata');

console.log('blink start ...');

var ledPin = 13;

var board = new firmata.Board('/dev/tty.usbmodemfa131', function(err) {
  if (err)
    throw err;

  console.log('connected');

  console.log('Firmware: ' + board.firmware.name + '-' +
    board.firmware.version.major + '.' + board.firmware.version.minor);

  var ledOn = true;
  board.pinMode(ledPin, board.MODES.OUTPUT);

  setInterval(function(){
    if (ledOn) {
      console.log('tick');
      board.digitalWrite(ledPin, board.HIGH);
      setTimeout(function () {
        board.digitalWrite(ledPin, board.LOW);
      }, 100);
    }

    ledOn = !ledOn;
  }, 1000);

});

process.on('SIGINT', function () {
  board.digitalWrite(ledPin, board.LOW);
  process.exit();
});
