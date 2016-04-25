var Box = module.exports = function Box(value) {
  this.value = value
}

Box.of = function(x) {
  return new Box(x)
}

Box.prototype.map = function(f) {
  return Box.of(f(this.value))
}

Box.prototype.ap = function(b) {
  return Box.of(this.value(b.value))
}

Box.prototype.chain = function(f) {
  return f(this.value)
}

