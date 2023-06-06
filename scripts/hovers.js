const { Hover, MarkdownString } = require('vscode');

class AlphaHoverProvider {
    provideHover(document, position, token) {
        const wordRange = document.getWordRangeAtPosition(position);
        const word = document.getText(wordRange);

        let hover;
        let message = new MarkdownString();
        if (word === 'println') {
            message.appendCodeblock(`function ${word}(...) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes any number of arguments and prints them.\n', 'alpha');
            message.appendMarkdown(`A newline is printed at the end.`, 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'print') {
            message.appendCodeblock(`function ${word}(...) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes any number of arguments and prints them.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'sin') {
            message.appendCodeblock(`function ${word}(x: number) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "number" and\n', 'alpha');
            message.appendMarkdown('returns the sine of that number.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'cos') {
            message.appendCodeblock(`function ${word}(x: number) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "number" and\n', 'alpha');
            message.appendMarkdown('returns the cosine of that number.\n', 'alpha');
            hover = new Hover(message);
        }
        else if (word === 'sqrt') {
            message.appendCodeblock(`function ${word}(x: number) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "number" and\n', 'alpha');
            message.appendMarkdown('returns the square root of that number.\n', 'alpha');
            message.appendMarkdown('The parameter should be a positive number ( >=0 ).\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'typeof') {
            message.appendCodeblock(`function ${word}(param: any) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of any type and\n', 'alpha');
            message.appendMarkdown('returns the type of the parameter as a string.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'totalarguments') {
            message.appendCodeblock(`function ${word}() {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes no arguments and\n', 'alpha');
            message.appendMarkdown('returns the number of total arguments the current function\n', 'alpha');
            message.appendMarkdown('was called with.\nThis function can only be used inside a function body.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'argument') {
            message.appendCodeblock(`function ${word}(index: number) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "number" and\n', 'alpha');
            message.appendMarkdown('returns the argument of the current function\n', 'alpha');
            message.appendMarkdown('at the specified index.\nThis function can only be used inside a function body.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'strtonum') {
            message.appendCodeblock(`function ${word}(param: string) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "string" and\n', 'alpha');
            message.appendMarkdown('returns a convertion of the string to a number\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'input') {
            message.appendCodeblock(`function ${word}() {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes no arguments and\n', 'alpha');
            message.appendMarkdown('returns a string or number from the input stream.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'objecttotalmembers') {
            message.appendCodeblock(`function ${word}(obj: object) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "object" and\n', 'alpha');
            message.appendMarkdown('returns the number of items contained in the object.\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'objectcopy') {
            message.appendCodeblock(`function ${word}(obj: object) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "object" and\n', 'alpha');
            message.appendMarkdown('returns a copy of the object. Object members are not copied\n', 'alpha');

            hover = new Hover(message);
        }
        else if (word === 'objectmemberkeys') {
            message.appendCodeblock(`function ${word}(obj: object) {\n\t/* code */\n}\n`, 'alpha');
            message.appendMarkdown('This function takes an argument of type "object" and\n', 'alpha');
            message.appendMarkdown('returns an object containing the keys of the object parameter.\n', 'alpha');

            hover = new Hover(message);
        }


        return Promise.resolve(hover);
    }
}

module.exports = AlphaHoverProvider;
