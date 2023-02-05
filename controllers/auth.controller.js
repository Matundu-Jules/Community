const { createUser } = require('../queries/users.queries')
/* ERROR HANDLER */
let errorsSignup = {
    username: '',
    email: '',
    password: '',
}

/* SIGNUP */
exports.signupForm = (req, res, next) => {
    res.render('pages/auth/signup-form', { errors: null })
}

exports.signup = async (req, res, next) => {
    const body = req.body
    try {
        const user = await createUser(body)

        res.redirect('/')
    } catch (err) {
        console.log(err.message)
        if (err.message.includes('username')) {
            errorsSignup.username = 'Username already used'
            console.log('USERNAME : ', errorsSignup.username)
        } else if (err.message.includes('email')) {
            errorsSignup.email = 'Email already used'
            console.log('EMAIL : ', errorsSignup.email)
        }

        res.render('pages/auth/signup-form', { errors: errorsSignup })
    }
}

/* SIGNIN */
exports.signinForm = (req, res, next) => {
    res.end()
}

exports.signin = (req, res, next) => {
    res.end()
}

/* SIGNOUT */
exports.signout = (req, res, next) => {
    res.end()
}
