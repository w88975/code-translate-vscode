// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const translate = require('./src/index.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    translate.init()
}
exports.activate = activate;

function deactivate() {
    translate.close()
}

module.exports = {
    activate,
    deactivate
}
