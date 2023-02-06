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
