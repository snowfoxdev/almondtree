const R = require('ramda');

module.exports = (group, tokens) =>
  R.filter(
    (token) =>
      R.pipe(
        R.is(String, token.value)
          ? R.equals(token.value)
          : R.test(token.value)
      )(group),
    tokens
  );
