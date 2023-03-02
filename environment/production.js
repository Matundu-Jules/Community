const path = require('path')

// Adding ssl certificate and key for production from the vps
module.exports = {
    // Express Server
    NODE_ENV: process.env.NODE_ENV || 'production',

    // SSL
    cert: '',
    key: '',

    // Ports
    PORTHTTP: process.env.PORTHTTP || 80,
    PORTHTTPS: process.env.PORTHTTPS || 443,
}
