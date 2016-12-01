var utils =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  assert: __webpack_require__(1),
	  collections: __webpack_require__(2),
	  functions: __webpack_require__(3),
	  parse: __webpack_require__(4),
	  vector: __webpack_require__(5),
	  fantasticBits: __webpack_require__(6)
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {ok: truthy, truthy, notNaN, type}

	function truthy (value) {
	  if (!value) throw new TypeError(`expected '${value}' to be true`)
	  return value
	}

	function notNaN (value) {
	  if (isNaN(value)) throw new TypeError(`expected '${value}' not to be NaN`)
	  return value
	}

	function type (type, value) {
	  if (typeof value !== type) throw new TypeError(`expected '${value}' to be of type '${type}'`)
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const {memoize} = __webpack_require__(3)

	/**
	 * @module collections
	 */
	module.exports = {minBy, maxBy, prop}

	/**
	 * @param {function} selector function by which to order values
	 * @returns reducer to find the minimum
	 * @example [1, 2, 3].reduce(minBy(() => 1 / x)) // 3
	 */
	function minBy (selector) {
	  selector = memoize(selector)
	  return (currentMinItem, item) => {
	    return selector(item) < selector(currentMinItem)
	      ? item
	      : currentMinItem
	  }
	}

	/**
	 * @param {function} selector function by which to order values
	 * @returns reducer to find the maximum
	 * @example [1, 2, 3].reduce(minBy(() => 1 / x)) // 1
	 */
	function maxBy (selector) {
	  selector = memoize(selector)
	  return (currentMinItem, item) => {
	    return selector(item) > selector(currentMinItem)
	      ? item
	      : currentMinItem
	  }
	}

	/**
	 * @example [{a: 1}, {a: 2}].map(prop('a')) // [1, 2]
	 */
	function prop (propName) {
	  return obj => obj[propName]
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * @module functions
	 */
	module.exports = {tap, memoize, compose, flow}

	function tap (value, fn) {
	  fn(value)
	  return value
	}

	function memoize (fn) {
	  const cache = new Map()
	  return x => cache.get(x) || tap(fn(x), r => cache.set(x, r))
	}

	/**
	 * Composes functions from right to left.
	 * @param {...functions} fns functions to compose
	 * @example compose(x => x + 1, x => x * 2)(3) // 7
	 */
	function compose (...fns) {
	  return flow(...fns.reverse())
	}

	/**
	 * Composes functions from left to right.
	 * @param {...functions} fns functions to compose
	 * @example flow(x => x + 1, x => x * 2)(3) // 8
	 */
	function flow (...fns) {
	  return x => fns.reduce((result, fn) => fn(result), x)
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const assert = __webpack_require__(1)

	/**
	 * @module parse
	 */
	module.exports = {entities, entity, numberOrString}

	/**
	 * Calls {@link entity} as many times as instructed by the first value
	 * returned by readline.
	 *
	 * @param {function} readline a function that produces strings; typically the
	 * builtin readline from CodinGame
	 * @param {...string} keys keys to be used by {@link entity}
	 */
	function entities (readline, ...keys) {
	  const n = assert.notNaN(Number(readline()))
	  return Array(n).fill(0).map(() => entity(readline(), ...keys))
	}

	/**
	 * Parses a line of space-separated values then associates each value with the
	 * given keys, in order, into an object, which is returned. If a word can be
	 * parsed into a number, it is.
	 *
	 * @param {string} strValue a line of space-separated values
	 * @param {...string} keys keys of the resulting object
	 *
	 * @example entity('1 2 c', 'a', 'b', 'c') // {a: 1, b: 2, c: 'c'}
	 */
	function entity (strValue, ...keys) {
	  assert.type('string', strValue)
	  return strValue.split(' ').map(numberOrString).reduce(toObject(...keys), {})
	}

	function toObject (...keys) {
	  return (result, item, index) => Object.assign(result, {[keys[index]]: item})
	}

	function numberOrString (strValue) {
	  return isNaN(strValue) ? strValue : Number(strValue)
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const {minBy} = __webpack_require__(2)

	/**
	 * @module vector
	 * @description 2D vector and point manipulation.
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
	   * Same as {@link module:vector.sub|sub}. More readable to build a vector
	   * from two points.
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
	  distance,
	  closest,
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
	 * @returns distance between two points.
	 * @param {Vector} self
	 * @param {Vector} other
	 */
	function distance (self, other) {
	  return length(sub(self, other))
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

	/**
	 * @static
	 * @returns {Vector} the closest point to self among others
	 * @param {Vector} self
	 * @param {Vector[]} others
	 */
	function closest (self, others) {
	  return others.reduce(minBy(other => distance(self, other)))
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  arena: __webpack_require__(7),
	  move: __webpack_require__(8),
	  parse: __webpack_require__(9),
	  quickStart: __webpack_require__(10)
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const {normalize, between, scale, add} = __webpack_require__(5)

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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const parse = __webpack_require__(4)

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const arena = __webpack_require__(7)
	const {closest} = __webpack_require__(5)

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


/***/ }
/******/ ]);