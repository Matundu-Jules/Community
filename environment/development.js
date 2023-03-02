const path = require('path')

module.exports = {
    // Express Server
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // SSL
    cert: path.join(__dirname, '../ssl/local.crt'),
    key: path.join(__dirname, '../ssl/local.key'),
}
