const R = require('ramda');
const tokenize = require('./tokenize');

module.exports = (text, { tokens }, leaveComments) =>
  R.pipe(
    // This is for when leaveComments is on
    R.reject((x) => x === '\n'),

    R.map(
      R.cond([
        // Utilizes token.replace and token.isCore
        ...R.pipe(
          R.filter(
            (token) => token.replace || token.isCore
          ),
          R.map((token) => [
            R.is(String, token.value)
              ? R.equals(token.value)
              : R.test(token.value),
            (x) => {
              if (token.isCore) {
                return 'core_' + x;
              } else {
                return token.replace;
              }
            },
          ])
        )(tokens),

        [R.T, R.identity],
      ])
    ),

    R.flatten
  )(tokenize(text, tokens, leaveComments));
