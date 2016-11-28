const {memoize} = require('./functions')

module.exports = {minBy, maxBy}

function minBy (selector) {
  selector = memoize(selector)
  return (currentMinItem, item) => {
    return selector(item) < selector(currentMinItem)
      ? item
      : currentMinItem
  }
}


function maxBy (selector) {
  selector = memoize(selector)
  return (currentMinItem, item) => {
    return selector(item) > selector(currentMinItem)
      ? item
      : currentMinItem
  }
}
