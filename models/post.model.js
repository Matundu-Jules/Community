const { DataTypes } = require('sequelize')
const sequelize = require('../config/postgresql.config')

// create Post model
const Post = sequelize.define(
    'Post',
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 140],
                    msg: '140 caractères maximum',
                },
                notEmpty: {
                    msg: 'Vous devez saisir un post',
                },
            },
        },
    },
    {
        tableName: 'Posts',
    }
)

Post.sync({ alter: true })
    .then(() => {
        console.log('Post Model sync')
    })
    .catch((err) => {
        next(err)
    })

module.exports = Post
