const router = require('express').Router()
const { signupForm, signup } = require('../controllers/users.controller')

// Routing pug
router.get('/signup/form', signupForm)

// APIs
router.post('/signup', signup)

module.exports = router
