const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcrypt')

// create User model
module.exports = (sequelize) => {
    // create User class extends Model
    class User extends Model {
        comparePassword(password) {
            return bcrypt.compare(password, this.local.password)
        }

        static hashPassword(password) {
            return bcrypt.hash(password, 12)
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
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
            avatar: {
                type: DataTypes.STRING,
                defaultValue: 'public/images/default-profile.jpg',
            },
            local: {
                type: DataTypes.JSON,

                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,

                    validate: {
                        len: {
                            args: [8, 256],
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
                googleId: { type: DataTypes.STRING },
            },
        },
        {
            sequelize,
            tableName: 'Users',
            modelName: 'User',
        }
    )

    return User
}
