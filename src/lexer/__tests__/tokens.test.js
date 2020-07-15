const R = require('ramda');
const getTokens = require('../getTokens');
const { tokens } = require('../../__tests__/e1-config');

test('(', () => {
  expect(getTokens('(', tokens)).toEqual([{ value: '(' }]);

  expect(getTokens('(1', tokens)).toEqual([]);
});

test(')', () => {
  expect(getTokens(')', tokens)).toEqual([{ value: ')' }]);
});

test('nums', () => {
  expect(getTokens('123.2312', tokens)).toEqual([
    { value: /^[\d\._]+$/ },
    {
      value: /^[0-9a-zA-Z_\.]+$/,
    },
  ]);
});

test('+', () => {
  expect(getTokens('+', tokens)).toEqual([
    { value: '+', replace: 'core_add' },
  ]);
});

test(`single quote`, () => {
  expect(getTokens(`'this is a test'`, tokens)).toEqual([
    { value: /^'[^']*'?$/ },
  ]);
});

test(`double quote`, () => {
  expect(getTokens(`"this is a test"`, tokens)).toEqual([
    { value: /^"[^"]*"?$/ },
  ]);
});

test(`comment`, () => {
  expect(
    getTokens(`; this  is a comment!!! `, tokens)
  ).toEqual([{ value: /^\n? *;.*\n?$/ }]);
});
