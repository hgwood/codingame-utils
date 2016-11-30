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
