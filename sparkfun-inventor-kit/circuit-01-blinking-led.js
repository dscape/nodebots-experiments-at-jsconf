var firmata = require('firmata')

var ledPin = 13

var board = new firmata.Board('/dev/tty.usbmodemfa131', function(err) {
  if (err) throw err

  console.log('(-)(+)')
  board.pinMode(ledPin, board.MODES.OUTPUT)

  setInterval(function(){
      process.stdout.write('.')
      board.digitalWrite(ledPin, board.HIGH)
      setTimeout(function () {
        board.digitalWrite(ledPin, board.LOW)
      }, 1000)
  }, 2000)
})

process.on('SIGINT', function () {
  board.digitalWrite(ledPin, board.LOW)
  process.exit()
})