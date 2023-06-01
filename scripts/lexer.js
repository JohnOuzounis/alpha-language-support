const { assert } = require("console");
const fs = require("fs");

class Lexer {
    constructor(text) {
        this.error = false;
        this.text = text;
        this.tokens = [];
        this.tokenActions = {};

        let handler = function (value) { return value; };
        this.tokenActions['NUMBER'] = handler;
        this.tokenActions['IDENTIFIER'] = handler;
        this.tokenActions['ASSIGN'] = handler;
        this.tokenActions['PLUS'] = handler;
        this.tokenActions['MINUS'] = handler;
        this.tokenActions['DIV'] = handler;
        this.tokenActions['MUL'] = handler;
        this.tokenActions['MOD'] = handler;
        this.tokenActions['EQUAL'] = handler;
        this.tokenActions['NOTEQUAL'] = handler;
        this.tokenActions['PLUSPLUS'] = handler;
        this.tokenActions['MINUSMINUS'] = handler;
        this.tokenActions['GREATER'] = handler;
        this.tokenActions['LESS'] = handler;
        this.tokenActions['GREATEREQUAL'] = handler;
        this.tokenActions['LESSEQUAL'] = handler;
        this.tokenActions['OPENCURLY'] = handler;
        this.tokenActions['CLOSECURLY'] = handler;
        this.tokenActions['OPENBRACKET'] = handler;
        this.tokenActions['CLOSEBRACKET'] = handler;
        this.tokenActions['OPENPAREN'] = handler;
        this.tokenActions['CLOSEPAREN'] = handler;
        this.tokenActions['SEMICOLON'] = handler;
        this.tokenActions['DOT'] = handler;
        this.tokenActions['COMMA'] = handler;
        this.tokenActions['COLON'] = handler;
        this.tokenActions['DOUBLECOLON'] = handler;
        this.tokenActions['DOTDOT'] = handler;

        handler = function () { return null; };
        this.tokenActions['WHITESPACE'] = handler;
        this.tokenActions['NEWLINE'] = handler;
        this.tokenActions['COMMENT'] = handler;
        this.tokenActions['BLOCKSTART'] = handler;
        this.tokenActions['BLOCKEND'] = handler;

        this.tokenActions['LITERAL'] = function (value) {
            const replace = function (value, seq, char, currentIndex) {
                const index = value.indexOf(seq, currentIndex);
                value = value.substring(0, index) + char + value.substring(index + 2, value.length);
                return value;
            };

            let i = 0;
            for (i = 0; i < value.length; i++) {
                if (value[i] === '\\' && i < value.length) {
                    const length = value.length;
                    if (value[i + 1] === 'n') value = replace(value, '\\n', '\n', i);
                    else if (value[i + 1] === 't') value = replace(value, '\\t', '\t', i);
                    else if (value[i + 1] === '0') value = replace(value, '\\0', '\0', i);
                    else if (value[i + 1] === 'r') value = replace(value, '\\r', '\r', i);
                    else if (value[i + 1] === '"') value = replace(value, '\\"', '\"', i);
                    else if (value[i + 1] === '\'') value = replace(value, '\'', '\'', i);
                    else if (value[i + 1] === '\\') value = replace(value, '\\\\', '\\', i);

                    if (length !== value.length) i++;
                }
            }
            return value;
        };

        this.tokenActions['NON_TOKEN'] = (value, line) => {
            if (value === '"')
                console.error(`Unclosed string in (Line ${line})`);
            else
                console.error(`Unrecognized char ${value} in (Line ${line})`);
            this.error = true;
            return null;
        };
    }

    tokenize() {
        let lineIndex = 1;

        const patterns = [
            { type: 'BLOCKSTART', regex: /\/\*[^(\/\*)]*/ },
            { type: 'BLOCKEND', regex: /\*\// },
            { type: 'COMMENT', regex: /\/\/.*/ },
            { type: 'NUMBER', regex: /\d+(\.\d+)?/ },
            { type: 'LITERAL', regex: /"([^\\\"]|\\.|\n)*"/ },
            { type: 'IDENTIFIER', regex: /[a-zA-Z_]([a-zA-Z_]*|([0-9]+)*)*/ },
            { type: 'ASSIGN', regex: /=/ },
            { type: 'PLUS', regex: /\+/ },
            { type: 'MINUS', regex: /-/ },
            { type: 'DIV', regex: /\// },
            { type: 'MUL', regex: /\*/ },
            { type: 'MOD', regex: /%/ },
            { type: 'EQUAL', regex: /==/ },
            { type: 'NOTEQUAL', regex: /!=/ },
            { type: 'PLUSPLUS', regex: /\+\+/ },
            { type: 'MINUSMINUS', regex: /--/ },
            { type: 'GREATER', regex: /</ },
            { type: 'LESS', regex: />/ },
            { type: 'GREATEREQUAL', regex: />=/ },
            { type: 'LESSEQUAL', regex: /<=/ },
            { type: 'OPENCURLY', regex: /\{/ },
            { type: 'CLOSECURLY', regex: /\}/ },
            { type: 'OPENBRACKET', regex: /\[/ },
            { type: 'CLOSEBRACKET', regex: /\]/ },
            { type: 'OPENPAREN', regex: /\(/ },
            { type: 'CLOSEPAREN', regex: /\)/ },
            { type: 'SEMICOLON', regex: /;/ },
            { type: 'DOT', regex: /\./ },
            { type: 'COMMA', regex: /,/ },
            { type: 'COLON', regex: /:/ },
            { type: 'DOUBLECOLON', regex: /::/ },
            { type: 'DOTDOT', regex: /\.\./ },
            { type: 'WHITESPACE', regex: /[ \t]+/ },
            { type: 'NEWLINE', regex: /\n/ },
            { type: 'NON_TOKEN', regex: /./ }
        ];

        const combinedPatterns = patterns.map(({ type, regex }) => `(?<${type}>${regex.source})`).join('|');
        const tokenRegex = new RegExp(combinedPatterns, 'g');

        let blocks = 0;
        let match;
        while ((match = tokenRegex.exec(this.text))) {
            const matchedText = match[0];
            let tokenType = Object.keys(match.groups).find(groupName => match.groups[groupName] !== undefined);
            const tokenAction = this.tokenActions[tokenType];

            assert(tokenAction);

            if (tokenType === 'BLOCKSTART') blocks++;
            else if (tokenType === 'BLOCKEND') blocks--;

            if (blocks < 0) {
                console.error(`Closing comment block without opening first (Line ${lineIndex})`);
                this.error = true;
                break;
            }

            let newLineCount = 0;
            if (tokenType === 'LITERAL' || tokenType === 'BLOCKSTART') {
                const newLineMatches = matchedText.match(/\n/g);
                newLineCount = newLineMatches ? newLineMatches.length : newLineCount;
            }

            const modifiedText = (blocks == 0) ? tokenAction(matchedText, lineIndex) : '';

            if (modifiedText) {
                tokenType = (function (value, type) {
                    const keywords = ["if", "else"];
                    if (keywords.includes(value))
                        return value.toUpperCase();
                    return type;
                })(modifiedText, tokenType);

                this.tokens.push({ type: tokenType, value: modifiedText, line: lineIndex });
            }

            lineIndex += newLineCount;
            if (tokenType === 'NEWLINE')
                lineIndex++;
        }
    }

    getTokens() {
        return this.tokens;
    }
}
module.exports = Lexer;
