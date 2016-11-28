module.exports = {
  add,
  relativeTo: add,
  sub,
  between: sub,
  mult,
  scale: mult,
  flip: self => mult(self, -1),
  length,
  clamp
}

function add (self, other) {
  return {x: self.x + other.x, y: self.y + other.y}
}

function sub (self, other) {
  return {x: other.x - self.x, y: other.y - self.y}
}

function mult (self, n) {
  return {x: n * self.x, y: n * self.y}
}

function length (self) {
  return Math.hypot(self.x, self.y)
}

function clamp (self, topLeft, bottomRight) {
  return {
    x: Math.min(bottomRight.x, Math.max(topLeft.x, self.x)),
    y: Math.min(bottomRight.y, Math.max(topLeft.y, self.y))
  }
}
