var randomInt = require('random-int')
var io = require('socket.io-client')
import NoSleep from 'my-nosleep'

var socket = io.connect(ENV.socketUrl || 'http://localhost:3000')
var noSleep = new NoSleep()

let bgEl = document.getElementById('background-content')
let bgStyleTemplate = (color) => `background-color: ${color};`

const changeColorOnSocketSubscription = () => {
  socket.on('change-color', data => {
    bgEl.setAttribute('style', bgStyleTemplate('#' + data.color))
  })
}

changeColorOnSocketSubscription()

var noSleepBtn = document.getElementById('enable-nosleep')
const enableNoSleep = () => {
  noSleep.enable()
  noSleepBtn.remove()
}
noSleepBtn.addEventListener('click', enableNoSleep, false);
