const passport = require('passport')
const { createUserQuery } = require('../queries/users.queries')

/* ERROR HANDLER */
let errorsSignup = {
    username: '',
    email: '',
    password: '',
}

/* ROUTING PUG */

// SIGNUP FORM
exports.signupForm = (req, res, next) => {
    console.log(req.isAuthenticated())
    res.render('pages/auth/signup-form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    })
}

// SIGNIN FORM
exports.signinForm = (req, res, next) => {
    res.render('pages/auth/signin-form', {
        errors: null,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
    })
}

/* LOCAL AUTH */

// SIGNUP
exports.signup = async (req, res, next) => {
    const body = req.body
    try {
        const user = await createUserQuery(body)
        console.log(body)

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

// SIGNIN
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

// SIGNOUT
exports.signout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/signin/form')
    })
}

/* GOOGLE AUTH */
exports.googleAuth = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })(req, res, next)
}

exports.googleAuthCb = (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: '/posts',
        failureRedirect: '/auth/signup/form',
        failureMessage: 'ERROR GOOGLE AUTH',
    })(req, res, next)
}
