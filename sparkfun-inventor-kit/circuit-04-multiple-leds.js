var five = require('johnny-five'),
    foldl = require('./hof').foldl

var leds =
  [ 2
  , 3
  , 4
  , 5
  , 6
  , 7
  , 8
  , 9
  ]

board = new five.Board()

board.on('ready', function() {
  console.log('(-)(+)')

  function runInteraction (interaction) {
    return function runInteractionInLED(z, led, next) {
      process.stdout.write(interaction === 'fadeIn' ? '+' : '—')
      console.log(led)
      led = new five.Led(led)
      led[interaction]()
      setTimeout(function () {
        next()
      }, 200)
    }
  }

  function runAllInteractions(z, interaction, next) {
    var l = JSON.parse(JSON.stringify(leds)) //clone
      , f = runInteraction(interaction)

    foldl(f, null, l, next)
  }

  foldl(runAllInteractions, null, ['fadeIn', 'fadeOut'], function done() {
    console.log('(+)(-)')
  })
})
