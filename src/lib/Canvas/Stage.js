function Stage (options) {
	this.layers    = []
	var container = this.container = document.getElementById(options.container)
	if (!container)
		throw new Error ('element #' + options.container + ' does not exist')
	var style = container.style
	style.position = 'relative'
	style.width  = options.width + 'px'
	style.height = options.height + 'px'
	style.overflow = 'hidden'
	this.width  = parseInt(options.width)
	this.height = parseInt(options.height)
}

Stage.prototype.add = function (layer) {
	var canvas = layer.canvas
	this.layers.push(layer)
	canvas.width  = layer.width  = this.width
	canvas.height = layer.height = this.height
	this.container.appendChild(canvas)
}

Stage.prototype.resize = function (dimensions) {
	var dim    = {}
	  , width  = dimensions.width
	  , height = dimensions.height
	  , style  = this.container.style
	if (typeof width === 'number') {
		style.width  = width  + 'px'
	}
	if (typeof height === 'number') {
		style.height = height + 'px'
	}
}

module.exports = Stage