const { DataTypes } = require('sequelize')
const sequelize = require('../config/postgresql.config')

// create User model
const User = sequelize.define(
    'User',
    {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            len: [4, 20],
            require: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
            len: [8, 20],
            require: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [8, 20],
            require: true,
        },
    },
    {
        tableName: 'Users',
    }
)

module.exports = User
