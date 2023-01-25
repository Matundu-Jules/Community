const bcrypt = require('bcrypt')

const {
    getUsersQuery,
    emailVerify,
    pseudoVerify,
    createUser,
} = require('../queries/auth.queries')

// display all users
exports.displayUsers = async (req, res, next) => {
    try {
        const users = await getUsersQuery()
        console.log(users)
        res.status(200).render('pages/users', { users })
    } catch (err) {
        next(err)
    }
}

// Create user
exports.userSignup = async (req, res, next) => {
    try {
        // data example : req.body
        const newUser = {
            pseudo: 'Jerrys',
            email: 'jerry2@example.com',
            password: '123',
        }
        // verify if email already exist
        // const email = await emailVerify('jerry@example.com')
        const email = await emailVerify(newUser.email)
        const pseudo = await pseudoVerify(newUser.pseudo)

        console.log('pseudo: ', pseudo.length)

        // errors strings
        let emailAlreadyExist =
            'Cet email est déja associé à un compte, veuillez en choisir un nouveau.'
        let pseudoAlreadyExist =
            'Cet pseudo est déja associé à un compte, veuillez en choisir un nouveau.'

        if (email.length === 0 && pseudo.length === 0) {
            res.render('pages/users', {
                error: { email: emailAlreadyExist, pseudo: pseudoAlreadyExist },
            })
        } else if (email.length === 0)
            res.render('pages/users', { error: { email: emailAlreadyExist } })
        else if (pseudo.length === 0)
            res.render('pages/users', { error: { pseudo: pseudoAlreadyExist } })

        // Hash mdp
        const salt = await bcrypt.genSalt(15)
        const hash = await bcrypt.hash(newUser.password, salt)

        // Create object for send user
        const userHashed = {
            ...newUser,
            password: hash,
        }

        // create user in db
        await createUser(userHashed)
        res.status(201).json({
            userCreated: true,
            message:
                'Votre compte a bien été créer. \nVeuillez vous connecter.',
        })
    } catch (err) {
        next(err)
    }
}
