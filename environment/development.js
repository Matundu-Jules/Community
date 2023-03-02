const path = require('path')

module.exports = {
    // Express Server
    NODE_ENV: process.env.NODE_ENV || 'development',

    // SSL
    cert: path.join(__dirname, '../ssl/local.crt'),
    key: path.join(__dirname, '../ssl/local.key'),

    // Ports
    PORTHTTP: process.env.PORTHTTP || 8080,
    PORTHTTPS: process.env.PORTHTTPS || 8081,
}
