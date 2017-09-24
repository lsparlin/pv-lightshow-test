var randomInt = require('random-int')
var io = require('socket.io-client')
import DoNotSleep from 'nosleep.js'

var socket = io.connect(ENV.socketUrl || 'http://localhost:3000')
var noSleep = new DoNotSleep()

let bgEl = document.getElementById('background-content')
let bgStyleTemplate = (color) => `background-color: ${color};`

const changeColorOnSocketSubscription = () => {
  socket.on('change-color', data => {
    bgEl.setAttribute('style', bgStyleTemplate('#' + data.color))
  })
}

changeColorOnSocketSubscription()
noSleep.enable()
