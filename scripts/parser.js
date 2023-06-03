const nearley = require('nearley');
const grammar = require('./grammar.js');

function parse(input) {
    let message = '';
    grammar.Lexer.tokenize(input);

    if (grammar.Lexer.error) {
        message += grammar.Lexer.message;
        return message;
    }

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
        parser.feed(grammar.Lexer.getTokens());
        if (parser.results.length == 0)
            throw new Error('Syntax Error: Unexpected end of file\n');
    } catch (error) {
        message += error.message.split('\n')[0];
    }
    return message;
}

module.exports = parse;
