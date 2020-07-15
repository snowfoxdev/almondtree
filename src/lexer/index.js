const R = require('ramda');
const tokenize = require('./tokenize');

module.exports = (
  text,
  { tokens, keywords },
  leaveComments
) =>
  R.pipe(
    // This is for when leaveComments is on
    R.reject((x) => x === '\n'),

    R.map(
      R.cond([
        // Utilizes token.replace
        ...R.pipe(
          R.filter((token) => token.replace),
          R.map((token) => [
            R.test(token.value),
            R.always(token.replace),
          ])
        )(tokens),

        // Utilizes keywords
        ...R.map(
          (keyword) => [
            R.equals(keyword),
            (x) => 'core_' + x,
          ],
          keywords
        ),

        [R.T, R.identity],
      ])
    ),

    R.flatten
  )(tokenize(text, tokens, leaveComments));
