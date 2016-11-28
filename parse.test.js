const parse = require('./parse')
const tape = require('tape')

tape('entity example', t => {
  t.deepEqual(
    parse.entity('1 2 3', 'a', 'b', 'c'),
    {a: 1, b: 2, c: 3}
  )
  t.end()
})

tape('entity accepts non-numbers as strings', t => {
  t.deepEqual(
    parse.entity('1 hello 3', 'a', 'b', 'c'),
    {a: 1, b: 'hello', c: 3}
  )
  t.end()
})

tape('entities example', t => {
  const readlineIter = ['2', '1', '2'][Symbol.iterator]()
  const readline = () => readlineIter.next().value
  t.deepEqual(
    parse.entities(readline, 'a'),
    [{a: 1}, {a: 2}]
  )
  t.end()
})

tape('entities returns an array of length given by the first number returned by readline', t => {
  const readlineIter = ['2', '', ''][Symbol.iterator]()
  const readline = () => readlineIter.next().value
  t.deepEqual(
    parse.entities(readline, '').length,
    2
  )
  t.end()
})

tape("numberOrString returns a string when given a string that can't be parsed as a number", t => {
  t.equal(parse.numberOrString('str'), 'str')
  t.end()
})

tape('numberOrString returns parses its input as a number', t => {
  t.equal(parse.numberOrString('4'), 4)
  t.end()
})
