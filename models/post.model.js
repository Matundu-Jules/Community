const { DataTypes } = require('sequelize')
const sequelize = require('../config/postgresql.config')

// create Post model
const Post = sequelize.define(
    'Post',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 140],
                    msg: '140 characters maximum',
                },
                notEmpty: {
                    args: true,
                    msg: 'You must enter a post',
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
        console.error(err)
        throw err
    })

module.exports = Post
