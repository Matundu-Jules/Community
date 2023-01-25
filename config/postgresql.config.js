const { Sequelize } = require('sequelize')

// create Sequelize instance
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        dialect: 'postgres',
    }
)

// connection with db
sequelize
    .authenticate()
    .then(() => console.log('connection with community database is connected'))
    .catch((err) => console.error('Database connexion failed', err.stack))

module.exports = sequelize
