const R = require('ramda');
const index = require('../index');
const config = require('../../__tests__/e1-config');

test('list', () => {
  const text = `(map (fn x) [1 2 3])`;

  expect(index(text, config)).toEqual([
    '(',
    'core_map',
    '(',
    'fn',
    'x',
    ')',
    '(',
    'core_list',
    '1',
    '2',
    '3',
    ')',
    ')',
  ]);
});

test('map', () => {
  const text = `(log {a 1 b 2})`;

  expect(index(text, config)).toEqual([
    '(',
    'core_log',
    '(',
    'core_hashmap',
    'a',
    '1',
    'b',
    '2',
    ')',
    ')',
  ]);
});
