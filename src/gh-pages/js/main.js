var Kinema = require('../../lib/Kinema.js')

var pause = true
var mute  = true
var resized = false

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

var getById = document.getElementById.bind(document)

var elem = {
    play_pause: getById('play_pause'),
    play_mute: getById('play_mute'),
    stop: getById('stop'),
    seek: getById('seek'),
    timeSeek: getById('num-seek'),
    speed: getById('speed'),
    resize: getById('resize')
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

elem.resize.addEventListener('click', function () {
  if (resized) {
    resized = false
    stage.resize({
      width: 500, 
      height: 500
    })
  } else {
    resized = true
    stage.resize({
      width: 300, 
      height: 300
    })
  }
})