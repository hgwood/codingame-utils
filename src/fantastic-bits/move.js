const {normalize, between, scale, add} = require('../vector')

module.exports = {step}

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
  const velocityDelta = scale(scale(normalize(between(entity, target)), entity.thrust), 1 / entity.mass)
  const movementVelocity = add(entity.velocity, velocityDelta)
  const newPosition = add(entity.position, movementVelocity)
  const newVelocity = scale(movementVelocity, entity.friction)
  return Object.assign({}, entity, {position: newPosition, velocity: newVelocity})
}
