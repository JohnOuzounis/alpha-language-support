const vscode = require('vscode');

class AlphaCompletionItemProvider {

    provideCompletionItems(document, position, token) {
        const completionItems = [];

        var variableItem = new vscode.CompletionItem('print', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function print';
        variableItem.insertText = 'print';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('println', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function println';
        variableItem.insertText = 'println';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('sin', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function sin';
        variableItem.insertText = 'sin';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('cos', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function cos';
        variableItem.insertText = 'cos';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('sqrt', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function sqrt';
        variableItem.insertText = 'sqrt';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('typeof', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function typeof';
        variableItem.insertText = 'typeof';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('totalarguments', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function totalarguments';
        variableItem.insertText = 'totalarguments';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('argument', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function argument';
        variableItem.insertText = 'argument';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('strtonum', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function strtonum';
        variableItem.insertText = 'strtonum';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('input', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function input';
        variableItem.insertText = 'input';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('objecttotalmembers', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function objecttotalmembers';
        variableItem.insertText = 'objecttotalmembers';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('objectcopy', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function objectcopy';
        variableItem.insertText = 'objectcopy';
        completionItems.push(variableItem);

        var variableItem = new vscode.CompletionItem('objectmemberkeys', vscode.CompletionItemKind.Function);
        variableItem.detail = 'Library function objectmemberkeys';
        variableItem.insertText = 'objectmemberkeys';
        completionItems.push(variableItem);

        return Promise.resolve(completionItems);
    }
}

module.exports = AlphaCompletionItemProvider;
