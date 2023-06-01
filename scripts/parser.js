const Lexer = require('./lexer.js');

function parse(input) {
    const lexer = new Lexer(input);
    lexer.tokenize();

    let tokens = lexer.getTokens();
    let currentIndex = 0;
    let message = '';
    let error = false;
    let line = 1;

    function match(token) {
        if (currentIndex < tokens.length && tokens[currentIndex].value === token) {
            currentIndex++;
            line = (currentIndex >= tokens.length) ? line : tokens[currentIndex].line;
        }
        else {
            let found = (currentIndex === tokens.length) ? 'end-of-file' : tokens[currentIndex].value;
            message += `Syntax Error (Line ${line}): Expected ${token} but found ${found}\n`;
            error = true;
        }
    }

    function program() {
        error = lexer.error;
        if (!lexer.error) {
            message += lexer.message;
            stmts();
        }
        else
            message = lexer.message;
    }

    function stmts() {
        if (currentIndex >= tokens.length || error) return;
        if (tokens[currentIndex].value !== ';') {
            stmt();
            stmts();
        }
    }

    function stmt() {
        if (tokens[currentIndex].value === '"hello"') {
            match('"hello"');
            match(';');
        } else if (tokens[currentIndex].value === ';') {
            match(';');
        }
        else {
            let found = (currentIndex === tokens.length) ? 'end-of-file' : tokens[currentIndex].value;
            message += `Syntax Error (Line ${line}): Unexpected ${tokens[currentIndex].type} ${found} found\n`;
            error = true;
        }
    }

    try {
        program();
        if (!error)
            message = 'OK\n';
        return message;
    } catch (error) {
        console.error(error);
        return message;
    }
}

module.exports = parse;
