const functions = require('./functions')
const tape = require('tape')

tape("memoize doesn't call the underlying function with the same argument twice", t => {
  const f = functions.memoize(() => Math.random())
  t.equal(f(), f())
  t.end()
})
