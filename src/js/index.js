import axios from 'axios'
var io = require('socket.io-client')
import NoSleep from 'my-nosleep'

let url = ENV.socketUrl || 'http://localhost:3000'
var socket = io.connect(url)
var noSleep = new NoSleep()
var conclusionUrl = '/thanks'

let bgEl = document.getElementById('background-content')
let contentEl = document.getElementById('content')
let bgStyleTemplate = (color) => `background-color: ${color};`

axios.get(url + '/settings').then(response => {
  let settings = response.data

  document.getElementById('introductoryText').textContent = settings.introductoryText
  conclusionUrl = settings.conclusionUrl
})

var timer
var currentColor
const changeBackgroundColor =(colorData) => {
  if (colorData.color != currentColor) {
    console.log('setting color ', colorData.color)
    bgEl.setAttribute('style', bgStyleTemplate('#' + colorData.color))
  }
  currentColor = colorData.color
  clearTimeout(timer)
  if (colorData.next) {
    timer = setTimeout(() => changeBackgroundColor(colorData.next), colorData.next.afterDur - 150)
  }
}

const subscribeToSocketEvents = () => {
  socket.on('change-color', data => {
    if (contentEl) {
      contentEl.remove()
    }
    changeBackgroundColor(data)
  })
  socket.on('conclude', () => {
    location.assign(conclusionUrl)
  })
}

subscribeToSocketEvents()

var noSleepBtn = document.getElementById('enable-nosleep')
const enableNoSleep = () => {
  noSleep.enable()
  noSleepBtn.parentNode.remove()
}
noSleepBtn.addEventListener('click', enableNoSleep, false);
