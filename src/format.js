
const humps = require('./humps')
module.exports = {
  // 单词拆分
  // 例: foor-bar 拆分为 [foo, bar]
  getWordArray: function (character) {
    let formatChar = character
    var capitalizes = formatChar.match(/[A-Z\s]{2,}/g)
    if (capitalizes && capitalizes.length) {
      capitalizes.map(item => {
        formatChar = formatChar.replace(item, humps.pascalize(item.toLowerCase()))
      })
    }
    if (!formatChar) {
      return
    }
    // 判断是否全大写
    if (/^[A-Z]+$/.test(character)) {
      return [character.toLowerCase()]
    }
    return Array.from(new Set(humps.decamelize(humps.camelize(formatChar), { separator: '|' }).split('|')))
  },
  cleanWord: function (character) {
    return character.replace(/"/g, '')
  }
}