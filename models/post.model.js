const { DataTypes } = require('sequelize')

// create Post model

module.exports = (sequelize, User) => {
    const Post = sequelize.define(
        'Post',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                unique: true,
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
            authorid: {
                type: DataTypes.STRING,
                references: {
                    model: 'Users',
                },
            },
        },
        {
            tableName: 'Posts',
        }
    )

    return Post
}
