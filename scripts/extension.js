
const vscode = require('vscode');
const path = require('path');
const child_process = require('child_process');

function activate(context) {
    const outputChannel = vscode.window.createOutputChannel('Alpha');

    function exec(exe, args) {
        child_process.execFile(`${exe}`, args,
            (error, stdout, stderr) => {
                if (error) { outputChannel.appendLine(stderr); throw error }
                if (stderr) { outputChannel.appendLine(stderr); return; }
                if (stdout) { outputChannel.appendLine(stdout); return; }
            });
    }

    function parse() {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && activeEditor.document.languageId === 'alpha') {
            const activeFilePath = activeEditor.document.uri.fsPath;
            const binFolderUri = vscode.Uri.joinPath(context.extensionUri, 'bin');
            const parserPath = vscode.Uri.joinPath(binFolderUri, 'parser.exe').fsPath;

            exec(parserPath, [`${activeFilePath}`]);
        }
    }

    function compileAndRunVM() {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const activeFilePath = activeEditor.document.uri.fsPath;
            const activeFileName = path.dirname(activeFilePath) + '\\' +
                path.basename(activeFilePath, path.extname(activeFilePath));

            const binFolderUri = vscode.Uri.joinPath(context.extensionUri, 'bin');
            const compilerPath = vscode.Uri.joinPath(binFolderUri, 'alphac.exe').fsPath;
            const vmPath = vscode.Uri.joinPath(binFolderUri, 'alpha.exe').fsPath;

            exec(compilerPath, [`${activeFilePath}`]);
            exec(vmPath, [`${activeFileName}.abc`]);
        }
    }

    let disposableParseCommand = vscode.commands.registerCommand('extension.parseGrammar', () => {
        parse();
    });

    let disposableRunCommand = vscode.commands.registerCommand('extension.compileAndRunVM', () => {
        compileAndRunVM();
    });

    // Trigger parsing when a file is saved
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'alpha') {
            parse();
        }
    });
    context.subscriptions.push(disposableParseCommand, disposableRunCommand);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
