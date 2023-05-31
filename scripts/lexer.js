class Lexer {
    constructor(text) {
        this.text = text;
        this.tokens = [];
        this.tokenActions = {};

        this.tokenActions['INTCONST'] = function (value) {
            console.log(`INTCONST Action: ${value}`);
            return value;
        };

        this.tokenActions['REALCONST'] = function (value) {
            console.log(`REALCONST Action: ${value}`);
            return value;
        };

        this.tokenActions['LITERAL'] = function (value) {
            console.log(`LITERAL Action: ${value}, ${value.replace(/\\(.)/g, '$1')}`);
            return value.replace(/\\(.)/g, '$1');
        };
    }

    tokenize() {
        const patterns = [
            { type: 'REALCONST', regex: /[0-9]+\.[0-9]+/ },
            { type: 'INTCONST', regex: /[0-9]+/ },
            { type: 'LITERAL', regex: /".*"/ },
            { type: 'WHITESPACE', regex: /[ \t\n]+/ }
        ];

        const combinedPatterns = patterns.map(({ type, regex }) => `(?<${type}>${regex.source})`).join('|');
        const tokenRegex = new RegExp(combinedPatterns, 'g');

        let match;
        let lastIndex = 0;

        while ((match = tokenRegex.exec(this.text))) {
            const { index } = match;
            let matchedText = match[0];
            const tokenType = Object.keys(match.groups).find(groupName => match.groups[groupName] !== undefined);
            const tokenAction = this.tokenActions[tokenType];

            if (lastIndex !== index) {
                const nonTokenText = this.text.substring(lastIndex, index);
                this.tokens.push({ type: 'NON_TOKEN', value: nonTokenText });
            }

            lastIndex = index + matchedText.length;

            if (tokenAction) {
                matchedText = tokenAction(matchedText);
            }

            this.tokens.push({ type: tokenType, value: matchedText });
        }

        if (lastIndex !== this.text.length) {
            const nonTokenText = this.text.substring(lastIndex);
            this.tokens.push({ type: 'NON_TOKEN', value: nonTokenText });
        }
    }

    getTokens() {
        return this.tokens;
    }
}
module.exports = Lexer;

// Example usage
const text = '42 3.14 "Hello,\\\" World!"';
const lexer = new Lexer(text);

lexer.tokenize();
const tokens = lexer.getTokens();

tokens.forEach(token => {
    console.log(`Token: ${token.type}, Value: ${token.value}`);
});
