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

const changeColorOnSocketSubscription = () => {
  socket.on('change-color', data => {
    if (contentEl) {
      contentEl.remove()
    }
    bgEl.setAttribute('style', bgStyleTemplate('#' + data.color))
  })
  socket.on('conclude', () => {
    location.assign(conclusionUrl)
  })
}

changeColorOnSocketSubscription()

var noSleepBtn = document.getElementById('enable-nosleep')
const enableNoSleep = () => {
  noSleep.enable()
  noSleepBtn.parentNode.remove()
}
noSleepBtn.addEventListener('click', enableNoSleep, false);
