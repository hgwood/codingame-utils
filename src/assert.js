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
