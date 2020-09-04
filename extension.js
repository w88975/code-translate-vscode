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
    translate.open()
    vscode.languages.registerHoverProvider('*', {
        async provideHover(document, position, token) {
            if (!document.getWordRangeAtPosition(position)) {
                return
            }
            let word = document.getText(document.getWordRangeAtPosition(position));
            let selectText = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
            if (selectText && word.indexOf(selectText) > -1) {
                word = selectText
            } 
            word = word.replace(/"/g, "")
            word = word.toLowerCase()
            let result = await translate.query(word);
            if (result && result.translation) {
                return new vscode.Hover(`翻译 [${word}](https://translate.google.com?text=${word}): ${result.translation}`)
            } else {
                return new vscode.Hover(`翻译 "${word}": 本地词库暂无结果 , [查看Google翻译](https://translate.google.com?text=${word})`);
            }
        }
    })
}
exports.activate = activate;

function deactivate() {
    translate.close()
}

module.exports = {
    activate,
    deactivate
}
