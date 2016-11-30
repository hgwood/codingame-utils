/**
 * @module vector
 */
module.exports = {
  add,
  /**
   * Same as {@link module:vector.add|add}. More readable when changing the
   * origin of a vector.
   * @function
   */
  relativeTo: add,
  sub,
  /**
   * Same as {@link module:vector.sub|sub}. More readable to get a vector from
   * two points.
   * @function
   */
  between: sub,
  mult,
  /**
   * Same as {@link module:vector.mult|mult}.
   * @function
   */
  scale: mult,
  /**
   * Same as {@link module:vector.scale|scale(self, -1)}.
   */
  flip: self => mult(self, -1),
  length,
  clamp,
  normalize
}

/**
 * @typedef Vector
 * @type {Object}
 * @property {number} x
 * @property {number} y
 */

/**
 * @static
 * @returns {Vector} addition of self and other
 * @param {Vector} self
 * @param {Vector} other
 */
function add (self, other) {
  return {x: self.x + other.x, y: self.y + other.y}
}

/**
 * @static
 * @returns {Vector} subtraction of self and other
 * @param {Vector} self
 * @param {Vector} other
 */
function sub (self, other) {
  return {x: other.x - self.x, y: other.y - self.y}
}

/**
 * @static
 * @returns {Vector} multiplication of self and n
 * @param {Vector} self
 * @param {number} n
 */
function mult (self, n) {
  return {x: n * self.x, y: n * self.y}
}

/**
 * @static
 * @returns {number} length of self
 */
function length (self) {
  return Math.hypot(self.x, self.y)
}

/**
 * Clamps the components of self using the components of two other vectors.
 * @static
 * @param {Vector} self
 * @param {Vector} topLeft vector with minimum components
 * @param {Vector} bottomRight vector with maximum components
 * @returns {Vector}
 */
function clamp (self, topLeft, bottomRight) {
  return {
    x: Math.min(bottomRight.x, Math.max(topLeft.x, self.x)),
    y: Math.min(bottomRight.y, Math.max(topLeft.y, self.y))
  }
}

/**
 * @static
 * @returns {Vector} a vector of length 1 parallel to self
 */
function normalize (self) {
  const selfLength = length(self)
  return {x: self.x / selfLength, y: self.y / selfLength}
}
