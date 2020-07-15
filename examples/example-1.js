const almondtree = require('../src/index');

const config = require('../src/__tests__/e1-config');

const text = `
(+ 1 (- 3 5))
`;

console.log(
  JSON.stringify(almondtree(text, config), null, 2)
);
