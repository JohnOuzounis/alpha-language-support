"use strict";
const vscode = require('vscode');
const parse = require('./parser.js');
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.parseGrammar', function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // Get the selected text
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            // Parse the selected text
            const result = parse(text);
            // Show the parsing result
            vscode.window.showInformationMessage(`Parsing result: ${result}`);
        }
    });
    // Trigger parsing when a file is saved
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'alpha') {
            const text = document.getText();
            // Parse the entire text of the file
            const result = parse(text);
            // Show the parsing result
            vscode.window.showInformationMessage(`${result}`);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
module.exports = {
    activate,
    deactivate
};
