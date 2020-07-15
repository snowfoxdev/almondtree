const R = require('ramda');
const getTokens = require('./getTokens');

const main = (text, tokens, leaveComments) =>
  R.reduce(
    ({ whole, chunk }, char) => {
      const removeWhitespace = leaveComments
        ? R.test(/^ $/, char)
        : R.test(/^ |\n$/, char);

      const removeComments = leaveComments
        ? true
        : !R.test(/^;.*\n?$/, chunk);

      const newChunk = chunk + char;

      return R.length(getTokens(newChunk, tokens))
        ? {
            whole,
            chunk: newChunk,
          }
        : {
            whole: [
              ...whole,
              ...(chunk && removeComments ? [chunk] : []),
            ],
            chunk: removeWhitespace ? '' : char,
          };
    },
    { whole: '', chunk: '' },
    text
  );

module.exports = (text, tokens, leaveComments) => {
  const obj = main(text, tokens, leaveComments);

  return [...obj.whole, obj.chunk];
};
