const lexer = require('./lexer/index');
const parser = require('./parser/index');

module.exports = (text, config) => {
  const tokenList = lexer(text, config, true);

  const ast = parser(tokenList);

  return ast;
};
