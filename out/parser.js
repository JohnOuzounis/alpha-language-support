"use strict";
function parse(input) {
    let tokens = input.split(/\s+/);
    let currentIndex = 0;
    let message = 'Parsing Complete';
    function match(token) {
        if (tokens[currentIndex] === token) {
            currentIndex++;
        }
        else {
            let found = tokens[currentIndex];
            if (currentIndex === tokens.length)
                found = 'end-of-file';
            message = `Syntax Error: Expected "${token}" but found "${found}"`;
        }
    }
    function program() {
        stmts();
    }
    function stmts() {
        if (tokens[currentIndex] !== ';') {
            stmt();
            stmts();
        }
    }
    function stmt() {
        if (tokens[currentIndex] === '"hello"') {
            match('"hello"');
            match(';');
        }
        else if (tokens[currentIndex] === ';') {
            match(';');
        }
    }
    try {
        program();
        return message;
    }
    catch (error) {
        console.error(error);
        return message;
    }
}
module.exports = parse;
