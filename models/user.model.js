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
            validate: {
                len: {
                    args: [4, 20],
                    msg: 'Le pseudo doit contenir entre 4 et 20 caractères',
                },
                notEmpty: {
                    msg: 'Vous devez choisir un pseudo',
                },
                containSpace(value) {
                    if (value.indexOf(' ') >= 0) {
                        throw new Error(
                            "Le pseudo ne peux pas contenir d'espace"
                        )
                    } else return 0
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [8, 50],
                    msg: "L'email doit contenir entre 8 et 50 caractères",
                },
                notEmpty: {
                    msg: 'Un email est nécessaire pour vous inscrire',
                },
                isEmail: { msg: 'Veuillez entrer un email valide' },
                containSpace(value) {
                    if (value.indexOf(' ') >= 0) {
                        throw new Error("L'email ne peux pas contenir d'espace")
                    }
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 60],
                    msg: 'Le mot de passe doit contenir entre 8 et 60 caractères',
                },
                notEmpty: { msg: 'Vous devez renseigner un mot de passe' },
                containSpace(value) {
                    if (value.indexOf(' ') >= 0) {
                        throw new Error(
                            "Le mot de passe ne peux pas contenir d'espace"
                        )
                    }
                },
            },
        },
    },
    {
        tableName: 'Users',
    }
)

User.sync({ alter: true })
    .then(() => {
        console.log('User Model sync')
    })
    .catch((err) => {
        next(err)
    })

module.exports = User
