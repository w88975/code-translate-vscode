function query(word) {
    return new Promise((resolve) => {
        if (word.length > 1) {
            let prefix = word.substring(0, 2)
            let dict = require(__dirname + `/dict/${prefix}.json`)
            if (dict[word]) {
                dict[word] instanceof Object ? resolve(dict[word].t) : resolve(dict[word])
                dict = null
            }
        }
        resolve(null)
    })
}

module.exports = query
