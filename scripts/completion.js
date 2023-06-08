const vscode = require('vscode');

class AlphaCompletionItemProvider {

    provideCompletionItems(document, position, token) {
        const completionItems = [];

        function makeItem(name, type) {
            var item = new vscode.CompletionItem(name, type);
            item.detail = `Library function ${name}`;
            item.insertText = name;
            return item;
        }

        completionItems.push(makeItem('print', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('println', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('sin', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('cos', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('sqrt', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('typeof', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('totalarguments', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('argument', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('strtonum', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('input', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('objecttotalmembers', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('objectcopy', vscode.CompletionItemKind.Function));
        completionItems.push(makeItem('objectmembrekeys', vscode.CompletionItemKind.Function));

        return Promise.resolve(completionItems);
    }
}

module.exports = AlphaCompletionItemProvider;
