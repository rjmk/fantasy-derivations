var jsv = require('jsverify')
var assert = require('assert')

var fallback = require('./')
var Box = require('./box.js')


var methods = Object.keys(Box.prototype)

var boxy = Box.of(2)

var map = Box.prototype.map
delete Box.prototype.map

assert.equal(fallback('map', boxy)(n => n + 1).value, 3)

Box.prototype.map = map

var ap = Box.prototype.ap
delete Box.prototype.ap

assert.equal(fallback('ap', Box.of(n => n + 1))(boxy).value, 3)

delete Box.prototype.map

assert.equal(fallback('map', boxy)(n => n + 1).value, 3)

