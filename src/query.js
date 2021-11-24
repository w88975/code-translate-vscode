function query(word) {
  return new Promise((resolve) => {
    if (word.length > 1) {
      let prefix = word.substring(0, 2)
      let dict = require(__dirname + `/dict/${prefix}.json`)
      if (dict[word]) {
        dict[word] instanceof Object ? resolve({
          w: dict[word].t,
          p: dict[word].p,
        }) : resolve({
          w: dict[word],
          p: '',
        })
        dict = null
      }
    }
    resolve({
      w: '',
      p: '',
    })
  })
}

module.exports = query
