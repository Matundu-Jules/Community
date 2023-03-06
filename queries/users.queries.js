const { Op } = require('sequelize')
const { User } = require('../config/postgresql.config')

exports.createUserQuery = async (user) => {
    try {
        const hashedPassword = await User.hashPassword(user.password)

        const newUser = User.build({
            username: user.username.trim(),
            local: {
                email: user.email,
                password: hashedPassword,
            },
        })

        return newUser.save()
    } catch (err) {
        throw err
    }
}

exports.findUserPerEmailQuery = (email) => {
    return User.findOne({ where: { 'local.email': email } })
}

exports.findUserPerIdQuery = (userId) => {
    return User.findByPk(userId)
}

exports.findUserPerGoogleIdQuery = (googleId) => {
    return User.findOne({ where: { id: googleId } })
}

exports.findUserPerUsername = (username) => {
    return User.findOne({ where: { username } })
}

exports.searchUsersPerUsername = (search) => {
    const regExp = `^${search}`
    // const reg = new RegExp(regExp) // no need for sequelize

    return User.findAll({
        where: { username: { [Op.regexp]: regExp } },
        order: [['username', 'ASC']],
    })
}
