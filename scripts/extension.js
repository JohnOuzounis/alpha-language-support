
const vscode = require('vscode');
const parse = require('./parser.js');
const path = require('path');
const child_process = require('child_process');

function activate(context) {
    const outputChannel = vscode.window.createOutputChannel('Alpha');

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
            if (result) {
                vscode.window.showErrorMessage(`${result}`);
                outputChannel.appendLine(`${result}`);
            }
        }
    });

    let disposableRunCommand = vscode.commands.registerCommand('extension.compileAndRunVM', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const activeFilePath = activeEditor.document.uri.fsPath;
            const activeFileName = path.dirname(activeFilePath) + '\\' +
                path.basename(activeFilePath, path.extname(activeFilePath));

            const binFolderUri = vscode.Uri.joinPath(context.extensionUri, 'bin');
            const compilerPath = vscode.Uri.joinPath(binFolderUri, 'alphac.exe').fsPath;
            const vmPath = vscode.Uri.joinPath(binFolderUri, 'alpha.exe').fsPath;

            child_process.execFile(`${compilerPath}`, [`${activeFilePath}`],
                (error, stdout, stderr) => {
                    if (error) { throw error }
                    if (stderr) { outputChannel.appendLine(stderr); return; }
                    if (stdout) { outputChannel.appendLine(stdout); return; }
                });

            child_process.execFile(`${vmPath}`, [`${activeFileName}.abc`],
                (error, stdout, stderr) => {
                    if (error) { throw error }
                    if (stderr) { outputChannel.appendLine(stderr); return; }
                    if (stdout) { outputChannel.appendLine(stdout); return; }
                });
        }
    });

    // Trigger parsing when a file is saved
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'alpha') {
            const text = document.getText();

            // Parse the entire text of the file
            const result = parse(text);

            // Show the parsing result
            if (result) {
                vscode.window.showErrorMessage(`${result}`);
                outputChannel.appendLine(`${result}`);
            }
        }
    });
    context.subscriptions.push(disposable, disposableRunCommand);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
