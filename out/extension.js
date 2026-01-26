"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const vscode = require('vscode');
const path = require('path');
const { spawn } = require('child_process');
const Completion = require('./completion.js');
const AlphaHover = require('./hovers.js');
function activate(context) {
    const outputChannel = vscode.window.createOutputChannel('Alpha');
    function getBinPath() {
        if (process.platform === 'win32')
            return 'bin\\windows';
        else if (process.platform === 'linux')
            return 'bin/linux';
        else
            throw Error('Unsupported platform');
    }
    function getParserPath() {
        if (process.platform === 'win32')
            return 'parser.exe';
        else if (process.platform === 'linux')
            return 'parser';
        else
            throw Error('Unsupported platform');
    }
    function getCompilerPath() {
        if (process.platform === 'win32')
            return 'alphac.exe';
        else if (process.platform === 'linux')
            return 'alphac';
        else
            throw Error('Unsupported platform');
    }
    function getVmPath() {
        if (process.platform === 'win32')
            return 'alpha.exe';
        else if (process.platform === 'linux')
            return 'alpha';
        else
            throw Error('Unsupported platform');
    }
    function exec(exe_1, args_1) {
        return __awaiter(this, arguments, void 0, function* (exe, args, runInTerminal = false) {
            return new Promise((resolve, reject) => {
                if (runInTerminal) {
                    const terminal = vscode.window.activeTerminal ||
                        vscode.window.createTerminal();
                    terminal.show();
                    const cmd = `"${exe}" ${args.map(a => `"${a}"`).join(' ')}`;
                    terminal.sendText(cmd);
                    resolve();
                    return;
                }
                const proc = spawn(exe, args, { shell: false });
                proc.stdout.on('data', data => outputChannel.appendLine(data.toString()));
                proc.stderr.on('data', data => outputChannel.appendLine(data.toString()));
                proc.on('error', err => reject(err));
                proc.on('close', code => {
                    if (code === 0)
                        resolve();
                    else
                        reject(new Error(`Process exited with code ${code}`));
                });
            });
        });
    }
    function parse() {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && activeEditor.document.languageId === 'alpha') {
            const activeFilePath = activeEditor.document.uri.fsPath;
            const binFolderUri = vscode.Uri.joinPath(context.extensionUri, getBinPath());
            const parserPath = vscode.Uri.joinPath(binFolderUri, getParserPath()).fsPath;
            exec(parserPath, [`${activeFilePath}`], false);
        }
    }
    function compileAndRunVM(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor) {
                const activeFilePath = activeEditor.document.uri.fsPath;
                const activeFileName = path.join(path.dirname(activeFilePath), path.basename(activeFilePath, path.extname(activeFilePath)));
                const binFolderUri = vscode.Uri.joinPath(context.extensionUri, getBinPath());
                const compilerPath = vscode.Uri.joinPath(binFolderUri, getCompilerPath()).fsPath;
                const vmPath = vscode.Uri.joinPath(binFolderUri, getVmPath()).fsPath;
                let wno = '';
                if (typeof args !== undefined) {
                    for (let key in args) {
                        if (args[key] === '-Wno') {
                            wno = '-Wno';
                            break;
                        }
                    }
                }
                outputChannel.show(true);
                outputChannel.clear();
                yield exec(compilerPath, [`${activeFilePath}`], false);
                yield exec(vmPath, [`${activeFileName}.abc`, `${wno}`].filter(Boolean), false);
            }
        });
    }
    let disposableParseCommand = vscode.commands.registerCommand('extension.parseGrammar', () => {
        parse();
    });
    let disposableRunCommand = vscode.commands.registerCommand('extension.compileAndRunVM', args => {
        compileAndRunVM(args);
    });
    let disposableCompletion = vscode.languages.registerCompletionItemProvider('alpha', new Completion(), '.');
    let disposableHover = vscode.languages.registerHoverProvider('alpha', new AlphaHover());
    // Trigger parsing when a file is saved
    vscode.workspace.onDidSaveTextDocument(document => {
        if (document.languageId === 'alpha') {
            parse();
        }
    });
    context.subscriptions.push(disposableParseCommand, disposableRunCommand, disposableCompletion, disposableHover);
}
exports.activate = activate;
function deactivate() { }
module.exports = {
    activate,
    deactivate,
};
