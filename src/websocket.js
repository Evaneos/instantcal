/* eslint global-require: "off" */
if (global.BROWSER) {
    module.exports = require('./browser/webSocket');
} else {
    module.exports = {};
}
