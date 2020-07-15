const R = require('ramda');

const tokens = [
  {
    value: /^\($/, // open parens
  },
  {
    value: /^\)$/, // close parens
  },
  {
    value: /^[\d\._]+$/, // number
  },
  {
    value: /^\+$/, // plus
  },
  {
    value: /^[0-9a-zA-Z_\.\+\/\=<>&]+$/, // identifiers
  },
  {
    value: /^'[^']*'?$/, // single quotes
  },
  {
    value: /^"[^"]*"?$/, // double quotes
  },
  // {
  //   value: /^\/[^\/\n]*\/?$/, // regex
  // },
  {
    value: /^\n? *;.*\n?$/, // comments
  },
];

module.exports = (group) =>
  tokens.filter((token) => {
    return R.test(token.value, group);
  });
