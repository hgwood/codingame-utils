const functions = require('./functions')
const tape = require('tape')

tape("memoize doesn't call the underlying function with the same argument twice", t => {
  const f = functions.memoize(() => Math.random())
  t.equal(f(), f())
  t.end()
})

tape('compose calls all function from right to left', t => {
  const f = functions.compose(x => x + 1, x => x * 2)
  t.equal(f(3), 7)
  t.end()
})

tape('flow calls all function from left to right', t => {
  const f = functions.flow(x => x + 1, x => x * 2)
  t.equal(f(3), 8)
  t.end()
})
