const R = require('ramda');

module.exports = (group, tokens) =>
  R.filter(
    (token) => R.pipe(R.test(token.value))(group),
    tokens
  );
