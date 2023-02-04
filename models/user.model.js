const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/postgresql.config')

// create User class extends Model
class User extends Model {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password)
    }

    static async hashPassword(password) {
        try {
            const salt = await bcrypt.salt(10)
            return bcrypt.hash(password, salt)
        } catch (err) {
            throw err
        }
    }
}

// create User model
User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

            validate: {
                len: {
                    args: [2, 50],
                    msg: 'Username must be between 4 and 20 characters',
                },
                notEmpty: {
                    msg: 'You must choose a username',
                },
            },
        },
        local: {
            type: DataTypes.JSON,

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,

                validate: {
                    len: {
                        args: [8, 50],
                        msg: 'Email must be between 8 and 50 characters',
                    },

                    notEmpty: {
                        msg: 'Email is required to register',
                    },

                    isEmail: { msg: 'Please enter a valid email' },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,

                get() {
                    return this.getDataValue('email')
                },

                validate: {
                    len: {
                        args: [8, 20],
                        msg: 'Password must be between 8 and 60 characters',
                    },

                    notEmpty: { msg: 'You must enter a password' },
                },
            },
        },
    },
    {
        sequelize,
        tableName: 'Users',
        modelName: 'User',
    }
)

User.sync({ alter: true })
    .then(() => {
        console.log('user model sync')
    })
    .catch((err) => {
        next(err)
    })

module.exports = User
