const { Sequelize, DataTypes } = require('sequelize')

// create Sequelize instance
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        dialect: 'postgres',
        logging: false,
    }
)

// connection with db
sequelize
    .authenticate()
    .then(() => console.log('connection with community database is connected'))
    .catch((err) => console.error('Database connexion failed', err.stack))

// relations
const db = {}
db.sequelize = sequelize
db.User = require('../models/user.model')(sequelize)
db.Post = require('../models/post.model')(sequelize)

db.User.hasMany(db.Post, {
    foreignKey: { name: 'author', allowNull: false, type: DataTypes.UUID },
})
db.Post.belongsTo(db.User, { foreignKey: 'author' })

db.sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('db sync')
    })
    .catch((err) => {
        console.log('Database Sync Error')
        throw err
    })

module.exports = db
