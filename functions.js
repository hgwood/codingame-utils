module.exports = {tap, memoize, compose, flow}

function tap (value, fn) {
  fn(value)
  return value
}

function memoize (fn) {
  const cache = new Map()
  return x => cache.get(x) || tap(fn(x), r => cache.set(x, r))
}

function compose (...fns) {
  return flow(...fns.reverse())
}

function flow (...fns) {
  return x => fns.reduce((result, fn) => fn(result), x)
}
