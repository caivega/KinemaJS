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
	  , width  = parseInt(dimensions.width)
	  , height = parseInt(dimensions.height)
	  , style  = this.container.style
	if (isFinite(width)) {
		style.width  = width  + 'px'
		this.width   = width
	}
	if (isFinite(height)) {
		style.height = height + 'px'
		this.height  = height
	}
}

module.exports = Stage