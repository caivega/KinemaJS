;(function (Kinema) {
	var Utils = Kinema.Utils
	Kinema.Layer = function (config) {
		this.canvas  = document.createElement('canvas')
		this.canvas.width  = this.__parent__.width
		this.canvas.height = this.__parent__.height
		this.context = this.canvas.getContext('2d')
		this.shapes = []
	}

	Kinema.Stage.prototype = {
		add: function (shape, priority) {
			shape.__parent__ = this
            Utils.addObject(this.shapes, shape)
		},
		remove: function (layer) {
			Utils.removeObject(this.shapes, shape)
			delete shape.__parent__
		},
		clear: function () {
			this.context.clearRect (0 , 0 , this.canvas.width, this.canvas.height);
		},
		draw: function () {
			for (this.shapes)
		}
	}
})