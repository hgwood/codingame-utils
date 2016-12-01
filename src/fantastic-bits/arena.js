/**
 * @module fantastic-bits/arena
 */
module.exports = {
  /**
   * Coordinates of the top left corner of the arena.
   */
  topLeft: {x: 0, y: 0},
  /**
   * Coordinates of the bottom right corner of the arena.
   */
  bottomRight: {x: 16000, y: 7500},
  /**
   * @returns the center of the goal you should put the ball in
   * @param {number} teamId
   */
  target: teamId => [{x: 16000, y: 3750}, {x: 0, y: 3750}][teamId]
}
