const arena = require('./arena')
const {closest} = require('../vector')

/**
 * @module fantastic-bits/quickStart
 */
/**
 * Implements a strategy capable of defeating bosses of the Wood league.
 * @param {number} teamId
 * @param {object} entities output from {@link module:fantastic-bits/parse.turnInfo}
 * @returns {string[][]} commands, each of which should be spread into print
 * @example quickStart(teamId, entities).forEach(command => print(...command))
 */
module.exports = function (teamId, entities) {
  return entities.wizards.map((wizard, index) => {
    if (wizard.hasSnaffle) {
      const {x, y} = arena.target(teamId)
      return ['THROW', x, y, wizard.maxThrowingForce]
    } else {
      const snaffle = closest(wizard, entities.snaffles)
      return ['MOVE', snaffle.x, snaffle.y, wizard.maxThrust]
    }
  })
}
