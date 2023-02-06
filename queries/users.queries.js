const { User } = require('../config/postgresql.config')

exports.createUser = async (user) => {
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

exports.findUserPerEmail = (email) => {
    return User.findOne({ where: { 'local.email': email } })
}

exports.findUserPerId = (userId) => {
    return User.findByPk(userId)
}

// verify if pseudo is already exist
// exports.pseudoExistQuery = (pseudo) => {
//     return User.findOne({ where: { pseudo: pseudo } })
// }
