var randomInt = require('random-int')
var io = require('socket.io-client')

var socket = io.connect('http://localhost:3000')

let bodyEl = document.getElementsByTagName('body')[0]
let bgStyleTemplate = (color) => `background-color: ${color};`
let colors = ENV.config.randomColors

const changeColorRandomOnLoad = () => {
  let randomColor = colors[randomInt(colors.length)]
  bodyEl.setAttribute('style', bgStyleTemplate(randomColor))
}

const changeColorOnSocketSubscription = () => {
  socket.on('change-color', data => {
    console.log('change color', data)
    bodyEl.setAttribute('style', bgStyleTemplate('#' + data.color))
  })
}

changeColorRandomOnLoad()
changeColorOnSocketSubscription()
