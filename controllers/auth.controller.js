const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { emailExistQuery, pseudoExistQuery } = require('../queries/auth.queries')

// Create user
exports.userSignup = async (req, res, next) => {
    try {
        // check if pseudo/email already exist
        const checkEmailExist = await emailExistQuery(req.body.email)
        const checkPseudoExist = await pseudoExistQuery(req.body.pseudo)

        if (checkEmailExist !== null && checkPseudoExist !== null) {
            console.log(checkEmailExist.toJSON())
            console.log(checkPseudoExist.toJSON())
            return res.status(400).json({
                userCreated: false,
                errorPseudo:
                    'Ce pseudo est déja pris, veuillez en choisir un nouveau.',
                errorEmail: 'Cet email est déja associé à un compte !',
            })
        } else if (checkEmailExist !== null) {
            console.log(checkEmailExist.toJSON())
            return res.status(400).json({
                userCreated: false,
                errorEmail: 'Cet email est déja associé à un compte !',
            })
        } else if (checkPseudoExist !== null) {
            console.log(checkPseudoExist.toJSON())
            return res.status(400).json({
                userCreated: false,
                errorPseudo:
                    'Ce pseudo est déja pris, veuillez en choisir un nouveau.',
            })
        }

        console.log(checkPseudoExist)
        console.log(checkEmailExist)

        // hash password :
        const salt = await bcrypt.genSalt(15)
        const hash = await bcrypt.hash(req.body.password, salt)

        // create user to db
        const user = await User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
        })

        console.log(user.toJSON())

        res.status(201).json({
            userCreated: true,
            message:
                'Votre compte a bien été créer. \nVeuillez vous connecter.',
        })
    } catch (err) {
        next(err)
    }
}
