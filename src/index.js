const vscode = require('vscode');
const CSVQuery = require('./query')


const genMarkdown = function (word, translation) {
    if (!translation) {
        return `翻译 \`${word}\` :  
本地词库暂无结果 , 查看[Google翻译](https://translate.google.com?text=${word})`
    }
    return `翻译 \`${word}\` :  
${translation.replace(/\\n/g, `  
`)}`;
}

async function init() {
    vscode.languages.registerHoverProvider('*', {
        async provideHover(document, position) {
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
            let ret = await CSVQuery(word)
            let hoverText = genMarkdown(word, ret)
            return new vscode.Hover(hoverText)
        }
    })
}


module.exports = {
    init
}
