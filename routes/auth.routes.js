const router = require('express').Router()
const {
    signupForm,
    signup,
    signinForm,
    signin,
    signout,
    googleAuth,
    googleAuthCb,
} = require('../controllers/auth.controller')

// Routing pug
router.get('/signup/form', signupForm)
router.get('/signin/form', signinForm)

// Local Auth
router.post('/signup', signup) // inscription
router.post('/signin', signin) // connection
router.get('/signout', signout) // logout

// Google Auth
router.get('/google', googleAuth) // go to google page validation
router.get('/google/cb', googleAuthCb) // redirect to website if success or not

module.exports = router
