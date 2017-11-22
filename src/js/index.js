import axios from 'axios'
var io = require('socket.io-client')
import NoSleep from 'my-nosleep'

let url = ENV.socketUrl || 'http://localhost:3000'
var socket = io.connect(url)
var noSleep = new NoSleep()

var conclusionUrl = '/thanks'
const messageElId = 'contextMessage'

let bgEl = document.getElementById('background-content')
let contentEl = document.getElementById('content')
let bgStyleTemplate = (color) => `background-color: ${color};`

axios.get(url + '/settings').then(response => {
  let settings = response.data

  document.getElementById(messageElId).textContent = settings.introductoryText
  conclusionUrl = settings.conclusionUrl
})

var timer
var currentColor
var latencyMs = 50
const changeBackgroundColor =(colorData) => {
  if (colorData.color != currentColor) {
    bgEl.setAttribute('style', bgStyleTemplate('#' + colorData.color))
  }
  
  currentColor = colorData.color
  clearTimeout(timer)
  if (colorData.next) {
    timer = setTimeout(() => changeBackgroundColor(colorData.next), colorData.next.afterDur - (latencyMs + 10))
  }
}

var startTime
const subscribeToSocketEvents = () => {
  setInterval(() => {
    startTime = Date.now()
    socket.emit('lat-ping')
  }, 2000)
  socket.on('lat-pong', () => latencyMs = Date.now() - startTime)
  socket.on('change-color', data => {
    document.getElementById(messageElId).textContent = data.message || ''
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
