const R = require('ramda');
const tokenize = require('../tokenize');
const { tokens } = require('../../__tests__/e1-config');

test('test 1', () => {
  const text = '(+ 1 2)';

  expect(tokenize(text, tokens)).toEqual([
    '(',
    '+',
    '1',
    '2',
    ')',
  ]);
});

test('test 2', () => {
  const text = '(+ (- 2 3) 2)';

  expect(tokenize(text, tokens)).toEqual([
    '(',
    '+',
    '(',
    '-',
    '2',
    '3',
    ')',
    '2',
    ')',
  ]);
});

test('test 3', () => {
  const text = `(map 'x' [1 2 3])`;

  expect(tokenize(text, tokens)).toEqual([
    '(',
    'map',
    `'x'`,
    '[',
    '1',
    '2',
    '3',
    ']',
    ')',
  ]);
});
