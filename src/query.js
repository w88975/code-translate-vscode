const fs = require('fs');
const readline = require('readline');

function csvToArray(csv, columnDelimiter = ',') {
    const table = csv.trim().replace(/\r\n?/g, '\n');
    let quoteCounter = 0;
    let lastDelimiterIndex = 0;
    let arrTable = [[]];
    let anchorRow = arrTable[arrTable.length - 1];
    for (let i = 0; i < table.length; i++) {
        const char = table[i];
        if (char === '"' && table[i - 1] !== '\\') {
            quoteCounter = quoteCounter ? 0 : 1;
            if (quoteCounter) {
                lastDelimiterIndex = i + 1;
            }
        } else if (
            !quoteCounter &&
            (char === columnDelimiter || char === '\n' || i === table.length - 1)
        ) {
            const startPos = lastDelimiterIndex;
            let col = startPos >= i ? '' : table.slice(startPos, i).trim();
            if (col[col.length - 1] === '"') {
                col = col.slice(0, col.length - 1);
            }
            anchorRow.push(col);
            lastDelimiterIndex = i + 1;
            if (char === '\n') {
                anchorRow = arrTable[arrTable.push([]) - 1];
            }
        }
    }
    return arrTable;
}

function query(word) {
    return new Promise((resolve) => {
        let count = 0;
        const readSteam = fs.createReadStream(__dirname + '/ecdict.csv')
        const objReadLine = readline.createInterface({
            input: readSteam
        })
        objReadLine.on('line', function (line) {
            if (count != 0) {
                let lineWord = line.split(',')[0]
                if (word == lineWord.toLowerCase()) {
                    let csvArray = csvToArray(line)
                    resolve(csvArray[0][3])
                    return objReadLine.close()
                }
            }
            count++
        })
        objReadLine.on('close', function () {
            resolve(null)
        })
    })
}

module.exports = query
