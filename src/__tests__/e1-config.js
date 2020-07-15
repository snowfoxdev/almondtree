const tokens = [
  {
    // (
    value: /^\($/,
  },
  {
    // )
    value: /^\)$/,
  },
  {
    // numbers
    value: /^[\d\._]+$/,
  },
  {
    // identifiers
    value: /^[0-9a-zA-Z_\.\+\/\=<>&]+$/,
  },
  {
    // single quotes string
    value: /^'[^']*'?$/,
  },
  {
    // double quotes string
    value: /^"[^"]*"?$/,
  },
  {
    // comments
    value: /^\n? *;.*\n?$/,
  },
  {
    // [
    value: /^\[$/,
    replace: ['(', 'core_list'],
  },
  {
    // ]
    value: /^\]$/,
    replace: [')'],
  },
  {
    // {
    value: /^{$/,
    replace: ['(', 'core_hashmap'],
  },
  {
    // }
    value: /^}$/,
    replace: [')'],
  },

  {
    // +
    value: /^\+$/,
    replace: 'core_add',
  },
];

const keywords = [
  'pipe',
  'subtract',
  'remainder',
  'divide',
  'multiply',
  'add',
  'equals',
  'or',
  'splitEvery',
  'join',
  'and',
  'gt',
  'lt',
  'gte',
  'lte',
  'concat',
  'all',
  'any',
  'set',
  'map',
  'imap',
  'type',
  'range',
  'hashmap',
  'list',
  'log',
];

module.exports = { tokens, keywords };
