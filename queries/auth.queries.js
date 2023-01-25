const User = require('../models/user.model')

// verify if email is already exist
exports.emailExistQuery = (email) => {
    return User.findOne({ where: { email: email } })
}

// verify if pseudo is already exist
exports.pseudoExistQuery = async (pseudo) => {
    return User.findOne({ where: { pseudo: pseudo } })
}
