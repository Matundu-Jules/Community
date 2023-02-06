const { use } = require('passport')
const passport = require('passport')
const { createUser } = require('../queries/users.queries')

/* ERROR HANDLER */
let errorsSignup = {
    username: '',
    email: '',
    password: '',
}

/* SIGNUP */
exports.signupForm = (req, res, next) => {
    res.render('pages/auth/signup-form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    })
}

exports.signup = async (req, res, next) => {
    const body = req.body
    try {
        const user = await createUser(body)

        req.login(user, (err) => {
            if (err) next(err)
            res.redirect('/')
        })
    } catch (err) {
        console.log(err.message)
        if (err.message.includes('username')) {
            errorsSignup.username = 'Username already used'
            console.log('USERNAME : ', errorsSignup.username)
        } else if (err.message.includes('email')) {
            errorsSignup.email = 'Email already used'
            console.log('EMAIL : ', errorsSignup.email)
        }

        res.status(403).render('pages/auth/signup-form', {
            errors: errorsSignup,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
        })
    }
}

/* SIGNIN */
exports.signinForm = (req, res, next) => {
    res.render('pages/auth/signin-form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    })
}

exports.signin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err)
        } else if (!user) {
            res.status(403).render('pages/auth/signin-form', {
                errors: info.message,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user,
            })
        } else {
            req.login(user, (err) => {
                if (err) {
                    next(err)
                } else {
                    res.redirect('/posts')
                }
            })
        }
    })(req, res, next)
}

/* SIGNOUT */
exports.signout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/signin/form')
    })
}
