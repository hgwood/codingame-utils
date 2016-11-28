const collections = require('./collections')
const tape = require('tape')

tape('minBy returns the minimum', t => {
  t.equal([1, 2, 3].reduce(collections.minBy(x => x)), 1)
  t.end()
})

tape('minBy returns the minimum from the original collection', t => {
  t.equal([1, 2, 3].reduce(collections.minBy(x => x * 2)), 1)
  t.end()
})

tape('minBy uses the iteratee to compare values', t => {
  t.equal([1, 2, 3].reduce(collections.minBy(x => 1 / x)), 3)
  t.end()
})

tape('maxBy returns the minimum', t => {
  t.equal([1, 2, 3].reduce(collections.maxBy(x => x)), 3)
  t.end()
})

tape('maxBy returns the minimum from the original collection', t => {
  t.equal([1, 2, 3].reduce(collections.maxBy(x => x * 2)), 3)
  t.end()
})

tape('maxBy uses the iteratee to compare values', t => {
  t.equal([1, 2, 3].reduce(collections.maxBy(x => 1 / x)), 1)
  t.end()
})
