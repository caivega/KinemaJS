module.exports = {
    removeObject: function (array, object) {
        if (!objectBelongsArray(object, array)) {
            return false
        } else {
            var id   = object.__id
            var n    = array.length - 1
            var last = array.pop()
            if (id < n) {
                array[id] = last
                last.__id = id
            }
            object.__id = undefined
            return true
        }
    },
    addObject: function (array, object) {
        if (objectBelongsArray(object, array)) {
            return false
        } else {        
            object.__id = array.length
            array.push(object)
            return true
        }
    }
}

function objectBelongsArray(object, array) {
    return typeof object.__id === 'number' && 0 <= object.__id && object.__id < array.length
}