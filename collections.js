const {memoize} = require('./functions')

module.exports = {minBy, maxBy}

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
