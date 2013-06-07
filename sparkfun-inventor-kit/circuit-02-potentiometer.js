var firmata = require('firmata')

var sensor  = 0
  , led     = 13
  , blinkin = false

console.log('(-)(+)')

function blink(reading) {
  if(blinkin) return
  board.digitalWrite(led, board.HIGH)
  console.log('> ' + reading)
  blinkin = true
  setTimeout(function () {
    board.digitalWrite(led, board.LOW)
    setTimeout(function () {
      blinkin = false
    }, reading)
  }, reading)
}

var board = new firmata.Board('/dev/tty.usbmodemfa131', function(err) {
  if (err) throw err

  console.log('> connected')
  board.pinMode(led, board.MODES.OUTPUT)

  board.analogRead(sensor, blink)
})

process.on('SIGINT', function () {
  board.digitalWrite(led, board.LOW)
  process.exit()
})