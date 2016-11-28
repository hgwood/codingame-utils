const vector = require('./vector')
const tape = require('tape')

tape('clamp return the input unchanged when its in range', t => {
  t.deepEqual(vector.clamp({x: 1, y: 1}, {x: 0, y: 0}, {x: 2, y: 2}), {x: 1, y: 1})
  t.end()
})

tape('clamp clamps x when its to small', t => {
  t.deepEqual(vector.clamp({x: -1, y: 1}, {x: 0, y: 0}, {x: 2, y: 2}), {x: 0, y: 1})
  t.end()
})

tape('clamp clamps x when its to large', t => {
  t.deepEqual(vector.clamp({x: 3, y: 1}, {x: 0, y: 0}, {x: 2, y: 2}), {x: 2, y: 1})
  t.end()
})

tape('clamp clamps y when its to small', t => {
  t.deepEqual(vector.clamp({x: 1, y: -1}, {x: 0, y: 0}, {x: 2, y: 2}), {x: 1, y: 0})
  t.end()
})

tape('clamp clamps y when its to large', t => {
  t.deepEqual(vector.clamp({x: 1, y: 3}, {x: 0, y: 0}, {x: 2, y: 2}), {x: 1, y: 2})
  t.end()
})

tape('clamp clamps both x and y', t => {
  t.deepEqual(vector.clamp({x: -1, y: 3}, {x: 0, y: 0}, {x: 2, y: 2}), {x: 0, y: 2})
  t.end()
})

tape('normalize returns a vector of length 1', t => {
  t.deepEqual(vector.length(vector.normalize({x: 4, y: 7})), 1)
  t.end()
})

tape('normalize does not change the direction of a vector', t => {
  const input = {x: 4, y: 7}
  const actual = vector.normalize(input)
  t.equal(Math.atan(actual.y / actual.x), Math.atan(input.y / input.x))
  t.end()
})
