;(function (Kinema) {
    var Utils = Kinema.Utils;

    function add(parent, childName, object) {
        var node = parent[childName]
        if (!node) {
            parent[childName] = {
                object: object
            }
        } else if (object.__priority__ < node.object.__priority__) {
            addIn(node, 'left' , object)
        } else {
            addIn(node, 'right', object)
        }
    }

    function searchExtrem(node, childName) {
        var temp
        while (node[childName])
            temp = node
            node = node[childName]
        }

        return [temp, childName];
    }

    function remove(node, object) {
        var node = parent[childName]
        if (node) {
            if (object.__priority__ < node.object.__priority__) {
                remove(node.left, object)
            } else if (object.__priority__ > node.object.__priority__){
                remove(node.right, object)
            } else if (object === node.object)
                if        (node.left  === undefined) {
                    parent[childName] = node.right
                } else if (node.right === undefined) {
                    parent[childName] = node.left
                } else {
                    var arr = searchExtrem(node.left, 'right')
                    var parentLeftMost = arr[0]
                    var temp = parentLeftMost.right.left
                    parentLeftMost.right.left = node.left
                    node.left   = parentLeftMost.right
                    node.object = parentLeftMost.object
                    parentLeftMost.right = temp
                }
            } else {
                remove(node.right, object)
            }
        }
    }

    function Tree() {
        this.__priority__ = 0;
        this.__array__ = [];
    }

    Tree.prototype.add = function (object, priority) {
        Utils.addObject(this.__array__, object)
        
        if (typeof object.__priority__ !== 'number' || object.__priority__ !== object.__priority__) {
            if (typeof priority === 'number' && priority === priority) {
                object.__priority__ = priority;
            } else {
                priority = object.__priority__ = this.__priority__;
                this.__priority__++;
            }
        } else {
            priority = object.__priority__
        }
        
        add(this, 'root', object);
    }

    Tree.prototype.remove = function (object) {
        Utils.removeObject(this.__array__, object)

        if (typeof object.__priority__ === 'number' && object.__priority__ === object.__priority__) {
            
        }
    }
