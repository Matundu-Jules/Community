const path = require('path')

// Adding ssl certificate and key for production from the vps
module.exports = {
    // Express Server
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || 'production',

    // SSL
    cert: path.join(__dirname, ''),
    key: path.join(__dirname, ''),
}
