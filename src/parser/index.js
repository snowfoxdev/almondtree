const R = require('ramda');

const main = (list, map, c) => {
  const head = R.head(list);
  const tail = R.tail(list);

  if ('(' === head) {
    const newC = c + 1;

    return main(tail, { ...map, [newC]: [] }, newC);
  } else if (')' === head) {
    const newC = c - 1;

    if (newC === 0) {
      return map[c];
    } else {
      return main(
        tail,
        { ...map, [newC]: [...map[newC], map[c]] },
        newC
      );
    }
  } else {
    return main(
      tail,
      { ...map, [c]: [...(map[c] || []), head] },
      c
    );
  }
};

module.exports = (tokenList) => main(tokenList, {}, 0);
