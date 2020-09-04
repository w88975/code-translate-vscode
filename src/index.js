const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, 'db.db');

module.exports = {
    open() {
        console.log(dbPath)
        this.Db = new sqlite3.Database(dbPath);
    },
    close() {
        if (this.Db) {
            this.Db.close();
            this.Db = null;
        }
    },
    query(word) {
        if (!this.Db) {
            this.open();
        }
        const sql = `select * from ecdict where word="${word}"`;
        return new Promise((resolve, reject) => {
            this.Db.all(sql, (err, rows) => {
                if (err) {
                    resolve(null);
                } else {
                    if (rows.length > 0) {
                        resolve(rows[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        })

    }
};