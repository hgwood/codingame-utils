const parsing = require('./parsing')
const tape = require('tape')

tape('entity example', t => {
  t.deepEqual(
    parsing.entity('1 2 3', 'a', 'b', 'c'),
    {a: 1, b: 2, c: 3}
  )
  t.end()
})

tape('entities example', t => {
  const readlineIter = ['2', '1', '2'][Symbol.iterator]()
  const readline = () => readlineIter.next().value
  t.deepEqual(
    parsing.entities(readline, 'a'),
    [{a: 1}, {a: 2}]
  )
  t.end()
})

tape('entities returns an array of length given by the first number returned by readline', t => {
  const readlineIter = ['2', '', ''][Symbol.iterator]()
  const readline = () => readlineIter.next().value
  t.deepEqual(
    parsing.entities(readline, '').length,
    2
  )
  t.end()
})

tape("numberOrString returns a string when given a string that can't be parsed as a number", t => {
  t.equal(parsing.numberOrString('str'), 'str')
  t.end()
})

tape('numberOrString returns parses its input as a number', t => {
  t.equal(parsing.numberOrString('4'), 4)
  t.end()
})
