var Kinema = require('../../lib/Kinema.js')

var pause = true
var mute  = true

var stage = new Kinema.Stage({
	container: 'container',
	width: 500,
	height: 500
})

var layer = new Kinema.Layer()

var circle = new Kinema.Circle({
	x: 0,
	y: 200,
	radius: 5,
	fill: 'black'
})

layer.add(circle)
stage.add(layer)

var elem = {
    play_pause: document.getElementById('play_pause'),
    play_mute: document.getElementById('play_mute'),
    stop: document.getElementById('stop'),
    seek: document.getElementById('seek'),
    timeSeek: document.getElementById('num-seek'),
    speed: document.getElementById('speed')
}

var animation = new Kinema.Animation(function (frame) {
  circle.setX(frame.time / 30)
  layer.draw()
})

elem.play_pause.addEventListener('click', function () {
  if (pause || mute) {
    animation.play()
    pause = mute = false
    elem.play_pause.innerHTML = 'pause'
    elem.play_mute.innerHTML  = 'mute'
  } else {
  	animation.pause()
  	pause = true
  	elem.play_pause.innerHTML = elem.play_mute.innerHTML = 'play'
  }
})

elem.play_mute.addEventListener('click', function () {
  if (pause || mute) {
    animation.play()
    pause = mute = false
    elem.play_pause.innerHTML = 'pause'
    elem.play_mute.innerHTML  = 'mute'
  } else {
    animation.mute()
    mute = true
    elem.play_pause.innerHTML = elem.play_mute.innerHTML = 'play'
  }
})

elem.stop.addEventListener('click', function () {
  animation.stop()
  pause = true
  elem.play_pause.innerHTML = elem.play_mute.innerHTML = 'play'
})

elem.seek.addEventListener('click', function () {
  var time = elem.timeSeek.value
  time = parseInt(time)
  animation.seek(time)
})

elem.speed.addEventListener('input', function () {
  var speed = elem.speed.value
  speed = parseFloat(speed)
  //console.log('speed', speed)
  animation.speed(speed)
})