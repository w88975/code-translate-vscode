const translate = require('./src/index.js');
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate() {
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
