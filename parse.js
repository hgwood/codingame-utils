const assert = require('./assert')

module.exports = {entities, entity, numberOrString}

function entities (readline, ...keys) {
  const n = assert.notNaN(Number(readline()))
  return Array(n).fill(0).map(() => entity(readline(), ...keys))
}

function entity (strValue, ...keys) {
  assert.type('string', strValue)
  return strValue.split(' ').map(Number).reduce(toObject(...keys), {})
}

function toObject (...keys) {
  return (result, item, index) => Object.assign(result, {[keys[index]]: item})
}

function numberOrString (strValue) {
  return isNaN(strValue) ? strValue : Number(strValue)
}
