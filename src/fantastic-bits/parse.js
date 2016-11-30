const parse = require('../parse')

/**
 * @module fantastic-bits/parse
 */
module.exports = {turnInfo}

function turnInfo (readline) {
  return parse.entities(readline, 'id', 'type', 'x', 'y', 'vx', 'vy', 'state')
    .map(entity => Object.assign(entity, {
      position: {x: entity.x, y: entity.y},
      velocity: {x: entity.vx, y: entity.vy},
      hasSnaffle: entity.state === 1,
      isWizard: entity.type === 'WIZARD',
      isOpponent: entity.type === 'OPPONENT_WIZARD',
      isSnaffle: entity.type === 'SNAFFLE',
      isBludger: entity.type === 'BLUDGER'
    }))
    .map(entity => Object.assign(entity, {
      isPlayer: entity.isWizard || entity.isOpponent,
      isBall: entity.isSnaffle || entity.isBludger,
      maxThrust: entity.isWizard ? 150 : undefined,
      maxThrowingForce: entity.isWizard ? 500 : undefined
    }))
    .reduce((entities, entity) => {
      entities.all.push(entity)
      if (entity.isPlayer) entities.players.push(entity)
      if (entity.isWizard) entities.wizards.push(entity)
      if (entity.isOpponent) entities.opponents.push(entity)
      if (entity.isBall) entities.balls.push(entity)
      if (entity.isSnaffle) entities.snaffles.push(entity)
      if (entity.isBludger) entities.bludgers.push(entity)
      return entities
    }, {
      all: [],
      players: [],
      wizards: [],
      opponents: [],
      balls: [],
      snaffles: [],
      bludgers: []
    })
}
