"use strict";
const vscode = require('vscode');
class AlphaCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        const completionItems = [];
        function makeItem(name, type, detailed) {
            var item = new vscode.CompletionItem(name, type);
            item.insertText = name;
            if (detailed)
                item.detail = `Library function ${name}`;
            return item;
        }
        (() => {
            const patterns = [
                { type: 'IDENTIFIER', regex: /[a-zA-Z_]([a-zA-Z_]*|([0-9]+)*)*/ },
                { type: 'COMMENTSTART', regex: /\/\*/ },
                { type: 'COMMENTEND', regex: /\*\// },
                { type: 'COMMENT', regex: /\/\/.*/ },
                { type: 'LITERAL', regex: /"([^\\\"]|\\.|\n)*"/ }
            ];
            const combinedPatterns = patterns.map(({ type, regex }) => `(?<${type}>${regex.source})`).join('|');
            const tokenRegex = new RegExp(combinedPatterns, 'g');
            function isKeyword(identifier) {
                const keywords = [
                    "if", "else", "for", "while", "return", "function",
                    "and", "or", "not", "true", "false", "nil",
                    "local", "break", "continue", "in"
                ];
                return (keywords.includes(identifier));
            }
            function isLibFunc(identifier) {
                const funcs = [
                    "print", "println", "sin", "cos", "sqrt", "typeof", "argument", "strtonum", "input",
                    "totalarguments", "objecttotalmembers", "objectcopy", "objectmemberkeys",
                    "objectcontains", "tostring", "abs", "int", "log", "exp", "ceil", "floor", "wait"
                ];
                return (funcs.includes(identifier));
            }
            let commented = 0;
            let match;
            while ((match = tokenRegex.exec(document.getText()))) {
                const identifier = match[0];
                const tokenType = Object.keys(match.groups).find(groupName => match.groups[groupName] !== undefined);
                if (tokenType === 'COMMENTSTART')
                    commented++;
                if (tokenType === 'COMMENTEND')
                    commented--;
                if (!(tokenType === 'IDENTIFIER') || commented > 0)
                    continue;
                const existingItem = completionItems.find(item => item.label === identifier);
                if (!existingItem && !isKeyword(identifier) && !isLibFunc(identifier)) {
                    completionItems.push(makeItem(identifier, vscode.CompletionItemKind.Variable, false));
                }
            }
        })();
        completionItems.push(makeItem('print', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('println', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('sin', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('cos', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('sqrt', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('typeof', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('totalarguments', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('argument', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('strtonum', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('input', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('objecttotalmembers', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('objectcopy', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('objectmemberkeys', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('objectcontains', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('tostring', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('abs', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('int', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('exp', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('ceil', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('floor', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('log', vscode.CompletionItemKind.Function, true));
        completionItems.push(makeItem('wait', vscode.CompletionItemKind.Function, true));
        return Promise.resolve(completionItems);
    }
}
module.exports = AlphaCompletionItemProvider;
