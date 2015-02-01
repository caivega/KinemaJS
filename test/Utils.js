var Utils  = require('../src/Utils.js')
var expect  = require('expect.js')

var util = require('util')
console.debug = function (obj) {
    console.log(util.inspect(obj, { showHidden: true, depth: null }));
}

var test_addObject = []
var test_removeObject = []

// 0
test_addObject.push({
  it: 'adds object in empty array',
  action: function (data) {
    data.array = []
    data.obj   = {}
    data.ok    = Utils.addObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(true)
    expect(data.array.length).to.be(1)
    expect(data.array).contain(data.obj)
    expect(data.obj.__id).to.be(0)
    expect(data.array[data.obj.__id]).to.be(data.obj)
  }
})

// 1
test_addObject.push({
  it: 'adds an object that exists in a non-empty array',
  action: function (data) {
    test_addObject[0].action(data)
    data.ok = Utils.addObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(false)
    expect(data.array.length).to.be(1)
    expect(data.array).contain(data.obj)
    expect(data.obj.__id).to.be(0)
    expect(data.array[data.obj.__id]).to.be(data.obj)
  }
})

// 2
test_addObject.push({
  it: 'adds an object that doesn\'t exist in a non-empty array',
  action: function (data) {
    test_addObject[0].action(data)
    data.another = {}
    data.ok = Utils.addObject(data.array, data.another)
  },
  expect: function (data) {
    expect(data.ok).to.be(true)
    expect(data.array.length).to.be(2)
    expect(data.array).contain(data.obj)
    expect(data.array).contain(data.another)
    expect(data.another.__id).to.be(1)
    expect(data.array[data.obj.__id]).to.be(data.obj)
    expect(data.array[data.another.__id]).to.be(data.another)
  }
})

// 3
test_addObject.push({
  it: 'adds an object. Then, another object. Then, the first object',
  action: function (data) {
    test_addObject[2].action(data)
    data.ok = Utils.addObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(false)
    expect(data.array.length).to.be(2)
    expect(data.array).contain(data.obj)
    expect(data.array).contain(data.another)
    expect(data.obj.__id).to.be(0)
    expect(data.another.__id).to.be(1)
    expect(data.array[data.obj.__id]).to.be(data.obj)
    expect(data.array[data.another.__id]).to.be(data.another)
  }
})

// 4
test_addObject.push({
  it: 'adds an object. Then, another object. Then, the second object',
  action: function (data) {
    test_addObject[2].action(data)
    data.ok = Utils.addObject(data.array, data.another)
  },
  expect: function (data) {
    expect(data.ok).to.be(false)
    expect(data.array.length).to.be(2)
    expect(data.array).contain(data.obj)
    expect(data.array).contain(data.another)
    expect(data.obj.__id).to.be(0)
    expect(data.another.__id).to.be(1)
    expect(data.array[data.obj.__id]).to.be(data.obj)
    expect(data.array[data.another.__id]).to.be(data.another)
  }
})

// 5
test_addObject.push({
  it: 'adds an object. Then, another object. Then, another different object',
  action: function (data) {
    test_addObject[2].action(data)
    data.different = {}
    data.ok = Utils.addObject(data.array, data.different)
  },
  expect: function (data) {
    expect(data.ok).to.be(true)
    expect(data.array.length).to.be(3)
    expect(data.array).contain(data.obj)
    expect(data.array).contain(data.another)
    expect(data.array).contain(data.different)
    expect(data.obj.__id).to.be(0)
    expect(data.another.__id).to.be(1)
    expect(data.different.__id).to.be(2)
    expect(data.array[data.obj.__id]).to.be(data.obj)
    expect(data.array[data.another.__id]).to.be(data.another)
    expect(data.array[data.different.__id]).to.be(data.different)
  }
})

describe('Utils.addObject()', function() {
  test_addObject.forEach(function (test) {
    it(test.it, function() {
      var data = {}
      test.action(data)
      test.expect(data)
    })
  })
})

// 0
test_removeObject.push({
  it: 'removes object in empty array',
  action: function (data) {
    data.array = []
    data.obj   = {}
    data.ok    = Utils.removeObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(false)
    expect(data.array.length).to.be(0)
    expect(data.array).not.contain(data.obj)
    expect(data.obj.__id).to.be(undefined)
  }
})

// 1
test_removeObject.push({
  it: '1) removes object wich belongs to array',
  action: function (data) {
    test_addObject[0].action(data)
    data.ok = Utils.removeObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(true)
    expect(data.array.length).to.be(0)
    expect(data.array).not.contain(data.obj)
    expect(data.obj.__id).to.be(undefined)
  }
})

// 2
test_removeObject.push({
  it: 'removes object wich doesn\'t belong to array',
  action: function (data) {
    test_addObject[0].action(data)
    data.foo = {}
    data.ok = Utils.removeObject(data.array, data.foo)
  },
  expect: function (data) {
    expect(data.ok).to.be(false)
    expect(data.array.length).to.be(1)
    expect(data.array).not.contain(data.foo)
    expect(data.foo.__id).to.be(undefined)
    // extra
    expect(data.array).contain(data.obj)
    expect(data.obj.__id).to.be(0)
    expect(data.array[data.obj.__id]).to.be(data.obj)
  }
})

// 3
test_removeObject.push({
  it: 'removes object wich exists. Then, removes same object',
  action: function (data) {
    test_removeObject[1].action(data)
    data.ok = Utils.removeObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(false)
    expect(data.array.length).to.be(0)
    expect(data.array).not.contain(data.obj)
    expect(data.obj.__id).to.be(undefined)
  }
})

// 4
test_removeObject.push({
  it: 'removes object wich doesn\'t exist. Then, removes object wich exists',
  action: function (data) {
    test_removeObject[2].action(data)
    data.ok = Utils.removeObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok).to.be(true)
    expect(data.array.length).to.be(0)
    expect(data.array).not.contain(data.obj)
    expect(data.obj.__id).to.be(undefined)
  }
})

// 5
test_removeObject.push({
  it: '1) removes two objects wich belong to array',
  action: function (data) {
    test_addObject[5].action(data)
    data.ok1 = Utils.removeObject(data.array, data.obj)
    data.ok2 = Utils.removeObject(data.array, data.different)
  },
  expect: function (data) {
    expect(data.ok1).to.be(true)
    expect(data.ok2).to.be(true)
    expect(data.array.length).to.be(1)
    expect(data.array).not.contain(data.obj)
    expect(data.array).contain(data.another)
    expect(data.array).not.contain(data.different)
    expect(data.obj.__id).to.be(undefined)
    expect(data.another.__id).to.be(0)
    expect(data.different.__id).to.be(undefined)
  }
})

// 6
test_removeObject.push({
  it: '2) removes two objects wich belong to array',
  action: function (data) {
    test_addObject[5].action(data)
    data.ok1 = Utils.removeObject(data.array, data.different)
    data.ok2 = Utils.removeObject(data.array, data.another)
  },
  expect: function (data) {
    expect(data.ok1).to.be(true)
    expect(data.ok2).to.be(true)
    expect(data.array.length).to.be(1)
    expect(data.array).contain(data.obj)
    expect(data.array).not.contain(data.another)
    expect(data.array).not.contain(data.different)
    expect(data.obj.__id).to.be(0)
    expect(data.another.__id).to.be(undefined)
    expect(data.different.__id).to.be(undefined)
  }
})

// 7
test_removeObject.push({
  it: '3) removes two objects wich belong to array',
  action: function (data) {
    test_addObject[5].action(data)
    data.ok1 = Utils.removeObject(data.array, data.another)
    data.ok2 = Utils.removeObject(data.array, data.obj)
  },
  expect: function (data) {
    expect(data.ok1).to.be(true)
    expect(data.ok2).to.be(true)
    expect(data.array.length).to.be(1)
    expect(data.array).not.contain(data.obj)
    expect(data.array).not.contain(data.another)
    expect(data.array).contain(data.different)
    expect(data.obj.__id).to.be(undefined)
    expect(data.another.__id).to.be(undefined)
    expect(data.different.__id).to.be(0)
  }
})

describe('Utils.removeObject()', function() {
  test_removeObject.forEach(function (test) {
    it(test.it, function() {
      var data = {}
      test.action(data)
      test.expect(data)
    })
  })
});
