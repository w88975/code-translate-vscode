
const humps = require('humps')
module.exports = {
    // 单词拆分
    // 例: foor-bar 拆分为 [foo, bar]
    getWordArray: function (character) {
        if (!character) {
            return
        }
        // 判断是否全大写
        if (/^[A-Z]+$/.test(character)) {
            return [character.toLowerCase()]
        }
        return (humps.decamelize(humps.camelize(character), { separator: '|' })).split('|')
    },
    cleanWord: function (character) {
        return character.replace(/"/g, '')
    }
}