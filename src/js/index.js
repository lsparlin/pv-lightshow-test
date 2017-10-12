var randomInt = require('random-int')
var io = require('socket.io-client')
import NoSleep from 'my-nosleep'

var socket = io.connect(ENV.socketUrl || 'http://localhost:3000')
var noSleep = new NoSleep()

let bgEl = document.getElementById('background-content')
let contentEl = document.getElementById('content')
let bgStyleTemplate = (color) => `background-color: ${color};`

const changeColorOnSocketSubscription = () => {
  socket.on('change-color', data => {
    if (contentEl) {
      contentEl.remove()
    }
    bgEl.setAttribute('style', bgStyleTemplate('#' + data.color))
  })
  socket.on('conclude', data => {
    if (data && data.location) {
      location.assign(data.location)
    } else {
      location.assign('/thanks')
    }
  })
}

changeColorOnSocketSubscription()

var noSleepBtn = document.getElementById('enable-nosleep')
const enableNoSleep = () => {
  noSleep.enable()
  noSleepBtn.parentNode.remove()
}
noSleepBtn.addEventListener('click', enableNoSleep, false);
