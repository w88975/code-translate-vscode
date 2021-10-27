const vscode = require('vscode')
const DICTQuery = require('./query')
const formatter = require('./format')

const markdownHeader = `翻译 \`$word\` :  
`
const markdownFooter = `  
`
const markdownLine = `  
*****
`

const genMarkdown = function (word, translation) {
  if (!translation) {
    return `- [${word}](https://translate.google.cn?text=${word}) :  
本地词库暂无结果 , 查看 [Google翻译](https://translate.google.cn?text=${word}) [百度翻译](https://fanyi.baidu.com/#en/zh/${word})`
  }
  return `- [${word}](https://translate.google.cn?text=${word}) :  
${translation.replace(/\\n/g, `  
`)}`
}

async function init() {
  vscode.languages.registerHoverProvider('*', {
    async provideHover(document, position) {
      if (!document.getWordRangeAtPosition(position)) {
        return
      }
      let word = document.getText(document.getWordRangeAtPosition(position))
      let selectText = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection)
      if (selectText && word.indexOf(selectText) > -1) {
        word = selectText
      }
      let originText = formatter.cleanWord(word)
      let words = formatter.getWordArray(formatter.cleanWord(word))
      let hoverText = ''
      for (let i = 0; i < words.length; i++) {
        let _w = words[i]
        let ret = await DICTQuery(_w)
        if (i == 0) {
          hoverText += genMarkdown(_w, ret)
        } else {
          hoverText += markdownLine + genMarkdown(_w, ret)
        }
      }
      const header = markdownHeader.replace('$word', originText)
      hoverText = header + hoverText + markdownFooter
      return new vscode.Hover(hoverText)
    }
  })
}


module.exports = {
  init
}
