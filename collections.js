const {memoize} = require('./functions')

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
