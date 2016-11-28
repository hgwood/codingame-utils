module.exports = {tap, memoize}

function tap (value, fn) {
  fn(value)
  return value
}

function memoize (fn) {
  const cache = new Map()
  return x => cache.get(x) || tap(fn(x), r => cache.set(x, r))
}
