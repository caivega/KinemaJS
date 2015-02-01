;(function (Kinema) {
	var Utils = Kinema.Utils
	Kinema.Stage = function (config) {
		this.x = config.x
		this.y = config.y
		this.container = document.getElementById(config.container)
		this.layers = []
	}

	Kinema.Stage.prototype = {
		add: function (layer) {
            Utils.addObject(this.layers, layer)
            layer.__parent__ = this
		},
		remove: function (layer) {
			delete layer.__parent__
			Utils.removeObject(this.layers, layer)
		}
	}
})