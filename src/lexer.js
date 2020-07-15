const R = require('ramda');
const getToken = require('./tokens');

const reducer = (leaveComments) =>
  R.reduce(
    ({ group, whole, depth }, val) => {
      // console.log(group, "/", whole, "/", val);

      const removeWhitespace = leaveComments
        ? R.test(/^ $/, val)
        : R.test(/^ |\n$/, val);

      const removeComments = leaveComments
        ? true
        : !R.test(/^;.*\n?$/, group);

      const newGroup = group + val;

      // const open = f(val, "open");
      // const close = f(val, "close");

      const value = getToken(newGroup, 'value');

      // console.log(value, newGroup);

      if (value.length) {
        return {
          group: newGroup,
          whole,
          // depth: depth + 1,
        };
      } else {
        return {
          group: removeWhitespace ? '' : val,
          whole: [
            ...whole,
            ...(group && removeComments ? [group] : []),
          ],
        };
      }
    },
    { group: '', whole: '', depth: 0 }
  );

module.exports = (leaveComments) =>
  R.pipe(
    // (a) =>
    // `(let program (let ${a}) (if program (log program) program))`,

    (a) => `(root ${a})`,

    // R.replace(/\(\//g, "(divide "), // to avoid conflict with regex

    reducer(leaveComments),

    ({ group, whole }) => [...whole, group],

    leaveComments
      ? R.reject((x) => x === '\n')
      : R.identity,

    R.map(
      R.cond([
        [R.test(/^[\d\._]+$/), R.replace(/,/g, '')],
        [R.equals('['), R.always(['(', 'array'])],
        [R.equals(']'), R.always([')'])],
        [R.equals('{'), R.always(['(', 'object'])],
        [R.equals('}'), R.always([')'])],
        [R.T, R.identity],
      ])
    ),

    R.flatten
  );
