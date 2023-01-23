const { Client } = require('pg')

const client = new Client()

client
    .connect()
    .then(() => console.log('community database is connected'))
    .catch((err) => console.error('Database connexion failed', err.stack))

module.exports = client
