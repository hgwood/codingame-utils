const assert = require('./assert')

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
