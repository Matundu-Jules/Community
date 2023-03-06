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
    const likeExp = `${search}%`

    return User.findAll({
        where: { username: { [Op.iLike]: likeExp } },
        order: [['username', 'ASC']],
    })
}

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
    if (currentUser.following === null) {
        currentUser.following = [userId]
    } else {
        currentUser.following = [...currentUser.following, userId]
    }

    return currentUser.save()
}

exports.deleteUserIdToCurrentUserFollowing = (currentUser, userId) => {
    currentUser.following = currentUser.following.filter((id) => id !== userId)

    return currentUser.save()
}
