const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { emailExistQuery, pseudoExistQuery } = require('../queries/auth.queries')

// Create user
exports.authSignup = async (req, res, next) => {
    /* ERROR HANDLER */
    let errorsSignup = {
        pseudo: '',
        email: '',
        password: '',
    }

    try {
        // check if pseudo/email already exist
        const checkEmailExist = await emailExistQuery(req.body.email)
        const checkPseudoExist = await pseudoExistQuery(req.body.pseudo)

        if (checkEmailExist !== null && checkPseudoExist !== null) {
            errorsSignup.pseudo = 'Ce pseudo est déja pris'
            errorsSignup.email = 'Cet email est déja associé à un compte'
            res.status(400).render('pages/auth/signup', {
                errors: errorsSignup,
            })
        } else if (checkEmailExist !== null) {
            errorsSignup.email = 'Cet email est déja associé à un compte'
            res.status(400).render('pages/auth/signup', {
                errors: errorsSignup,
            })
        } else if (checkPseudoExist !== null) {
            errorsSignup.pseudo = 'Ce pseudo est déja pris'
            res.status(400).render('pages/auth/signup', {
                errors: errorsSignup,
            })
        }

        // hash password :
        const salt = await bcrypt.genSalt(15)
        const hash = await bcrypt.hash(req.body.password, salt)

        // create user to db
        const user = await User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
        })

        res.status(201).redirect('/')
    } catch (err) {
        err.errors.map((key) => {
            if (key.path === 'pseudo') {
                errorsSignup.pseudo = key.message
                console.log('PSEUDO : ', key.message)
            } else if (key.path === 'email') {
                errorsSignup.email = key.message
                console.log('EMAIL : ', key.message)
            } else if (key.path === 'password') {
                errorsSignup.password = key.message
                console.log('PASSWORD : ', key.message)
            }
        })

        res.status(400).render('pages/auth/signup', { errors: errorsSignup })
    }
}
