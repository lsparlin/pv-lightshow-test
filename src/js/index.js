var randomInt = require('random-int')
var io = require('socket.io-client')()

let bodyEl = document.getElementsByTagName('body')[0]
let bgStyleTemplate = (color) => `background-color: ${color};`
let colors = ENV.config.randomColors

const changeColorRandomOnLoad = () => {
  let randomColor = colors[randomInt(colors.length)]
  bodyEl.setAttribute('style', bgStyleTemplate(randomColor))
}

const changeColorOnSocketSubscription = () => {
}

changeColorRandomOnLoad()
