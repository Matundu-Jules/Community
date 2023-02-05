const router = require('express').Router()
const { signupForm, signup } = require('../controllers/auth.controller')

// Routing pug
router.get('/signup/form', signupForm)

// API
router.post('/signup', signup)

module.exports = router
