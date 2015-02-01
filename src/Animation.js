;(function (Kinema) {
	var Utils = Kinema.Utils
    var Animation = {
        on_animations: [],
        off_animations: [],
        active: false,
        on: function (animation) {
            if (!animation.on) {
                console.log('on')
                var x = Utils.removeObject(Animation.off_animations, animation)
                console.log('remove off:', x)
                var y = Utils.addObject(Animation.on_animations, animation)
                console.log('remove on:', y)
                animation.on = true
                return true
            } else
                return false
        },
        off: function (animation) {
            if (animation.on) {
                console.log('off')
                var x = Utils.removeObject(Animation.on_animations, animation)
                console.log('remove on:', x)
                var y = Utils.addObject(Animation.off_animations, animation)
                console.log('remove off:', y)
                animation.on = false
                return true
            } else
                return false
        },
        loop: function () {
            var now = Date.now()
            for (var id in Animation.on_animations) {
                //console.log(id)
                var animation = Animation.on_animations[id]
                var frame = {
                    time: now - animation.init
                }
                animation.func(frame)
            }
            Animation.loop_id = requestAnimationFrame(Animation.loop)
        }
    }

    Kinema.Animation = function (func, layer) {
        this.func   = func
        this.on     = false
        this.paused = 0
        this.init   = 0
        Utils.addObject(Animation.off_animations, this)

        Animation.off_animations[this.id] = this
        Animation.id++
    }    

    Kinema.Animation.prototype = {
        play: function () {
            console.log('play')
            this.init  += Date.now() - this.paused
            if (this.func && Animation.on(this) && !Animation.active) {
                Animation.loop()
                Animation.active = true                
            }
            console.log('length', Animation.on_animations.length)
        },
        pause: function () {
            console.log('pause')
            console.log(Animation.on_animations.length)
            if (this.func && Animation.off(this) && Animation.on_animations.length === 0) {
                cancelAnimationFrame(Animation.loop_id)
                console.log('cancel')
                Animation.active = false
            }
            this.paused = Date.now()
        },
        stop: function () {
            if (this.func) {
                this.pause()
                this.paused = 0
                this.init   = 0
            }
        },
        remove: function () {
        	if (this.func) {
                this.pause()
                if (this.on) {
                    Utils.removeObject(Animation.on_animations, this)
                } else {
                    Utils.removeObject(Animation.off_animations, this)
                }
                delete this.func
            }
        }
    }
})(Kinema)