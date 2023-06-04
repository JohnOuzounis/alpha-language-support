"use strict";
const vscode = require('vscode');
const path = require('path');
const child_process = require('child_process');
function activate(context) {
    const outputChannel = vscode.window.createOutputChannel('Alpha');
    let disposableParseCommand = vscode.commands.registerCommand('extension.parseGrammar', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const activeFilePath = activeEditor.document.uri.fsPath;
            const binFolderUri = vscode.Uri.joinPath(context.extensionUri, 'bin');
            const parserPath = vscode.Uri.joinPath(binFolderUri, 'parser.exe').fsPath;
            child_process.execFile(`${parserPath}`, [`${activeFilePath}`], (error, stdout, stderr) => {
                if (error) {
                    outputChannel.appendLine(stderr);
                    throw error;
                }
                if (stderr) {
                    outputChannel.appendLine(stderr);
                    return;
                }
                if (stdout) {
                    outputChannel.appendLine(stdout);
                    return;
                }
            });
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
            child_process.execFile(`${compilerPath}`, [`${activeFilePath}`], (error, stdout, stderr) => {
                if (error) {
                    outputChannel.appendLine(stderr);
                    throw error;
                }
                if (stderr) {
                    outputChannel.appendLine(stderr);
                    return;
                }
                if (stdout) {
                    outputChannel.appendLine(stdout);
                    return;
                }
            });
            child_process.execFile(`${vmPath}`, [`${activeFileName}.abc`], (error, stdout, stderr) => {
                if (error) {
                    outputChannel.appendLine(stderr);
                    throw error;
                }
                if (stderr) {
                    outputChannel.appendLine(stderr);
                    return;
                }
                if (stdout) {
                    outputChannel.appendLine(stdout);
                    return;
                }
            });
        }
    });
    // Trigger parsing when a file is saved
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'alpha') {
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor) {
                const activeFilePath = activeEditor.document.uri.fsPath;
                const binFolderUri = vscode.Uri.joinPath(context.extensionUri, 'bin');
                const parserPath = vscode.Uri.joinPath(binFolderUri, 'parser.exe').fsPath;
                child_process.execFile(`${parserPath}`, [`${activeFilePath}`], (error, stdout, stderr) => {
                    if (error) {
                        outputChannel.appendLine(stderr);
                        throw error;
                    }
                    if (stderr) {
                        outputChannel.appendLine(stderr);
                        return;
                    }
                    if (stdout) {
                        outputChannel.appendLine(stdout);
                        return;
                    }
                });
            }
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
