const router = require('express').Router()
const {
    signupForm,
    signup,
    signinForm,
    signin,
    signout,
} = require('../controllers/auth.controller')

// Routing pug
router.get('/signup/form', signupForm)
router.get('/signin/form', signinForm)

// API
router.post('/signup', signup) // inscription
router.post('/signin', signin) // connection
router.get('/signout', signout) // logout

module.exports = router
