module.exports = {ok: truthy, truthy, notNaN}

function truthy (value) {
  if (!value) throw new TypeError(`expected '${value}' to be true`)
  return value
}

function notNaN (value) {
  if (isNaN(value)) throw new TypeError(`expected '${value}' not to be NaN`)
  return value
}
