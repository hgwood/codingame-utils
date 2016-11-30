const {normalize, between, scale, add} = require('../vector')

/**
 * @module fantastic-bits/move
 */
module.exports = {
  step,
  nextVelocity,
  nextPosition,
  nextMoveVelocity,
  nextMove
}

/**
 * @typedef Entity
 * @type {Object}
 * @property {Vector} position
 * @property {Vector} velocity
 * @property {number} thrust
 * @property {number} mass
 */

/**
 * @typedef Vector
 * @type {Object}
 * @property {number} x
 * @property {number} y
 */

/**
 * @returns {Entity} entity with position and velocity forwarded in time by one turn
 * @param {Entity} entity entity for which to simulate the movement
 * @param {Entity} target entity that the entity is moving towards
 */
function step (entity, target) {
  return Object.assign({}, entity, {
    position: nextPosition(entity, target),
    velocity: nextVelocity(entity, target)
  })
}

/**
 * @returns {Vector}
 * @param {Entity} entity entity for which to simulate the movement
 * @param {Entity} target entity that the entity is moving towards
 */
function nextVelocity (entity, target) {
  return scale(nextMoveVelocity(entity, target), entity.friction)
}

/**
 * @returns {Vector}
 * @param {Entity} entity entity for which to simulate the movement
 * @param {Entity} target entity that the entity is moving towards
 */
function nextPosition (entity, target) {
  return add(entity.position, nextMoveVelocity(entity, target))
}

/**
 * @returns {Vector}
 * @param {Entity} entity entity for which to simulate the movement
 * @param {Entity} target entity that the entity is moving towards
 */
function nextMoveVelocity (entity, target) {
  return add(entity.velocity, nextMove(entity, target))
}

/**
 * @returns {Vector}
 * @param {Entity} entity entity for which to simulate the movement
 * @param {Entity} target entity that the entity is moving towards
 */
function nextMove (entity, target) {
  return scale(scale(normalize(between(entity, target)), entity.thrust), 1 / entity.mass)
}
