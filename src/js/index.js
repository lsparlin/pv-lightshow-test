var randomInt = require('random-int')
var io = require('socket.io-client')

var socket = io.connect('https://pv-lightshow-server.herokuapp.com')

let bgEl = document.getElementById('background-content')
let bgStyleTemplate = (color) => `background-color: ${color};`
let colors = ENV.config.randomColors

const changeColorRandomOnLoad = () => {
  let randomColor = colors[randomInt(colors.length)]
  bgEl.setAttribute('style', bgStyleTemplate(randomColor))
}

const changeColorOnSocketSubscription = () => {
  socket.on('change-color', data => {
    console.log('change color', data)
    bgEl.setAttribute('style', bgStyleTemplate('#' + data.color))
  })
}

changeColorRandomOnLoad()
changeColorOnSocketSubscription()
