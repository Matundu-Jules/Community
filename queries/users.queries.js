const User = require('../models/user.model')

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

// verify if email is already exist
exports.findUserPerEmail = (email) => {
    return User.findOne({ where: { email: email } })
}

// verify if pseudo is already exist
exports.pseudoExistQuery = (pseudo) => {
    return User.findOne({ where: { pseudo: pseudo } })
}
