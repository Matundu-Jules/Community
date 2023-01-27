const { authSignup } = require('../controllers/auth.controller')

const router = require('express').Router()

// maybe add module yup validations in folder validations/userValidation.js for check signin/signup forms

// Routing pug
// GET : signup form
router.get('/signup', (req, res) => {
    res.render('pages/auth/signup')
})
// GET : login form
router.get('/login', (req, res) => {
    res.render('pages/auth/login')
})

// POST : signup
router.post('/signup', authSignup)

// POST : Connection
// router.post('/login', authCtrl.userLogin)

module.exports = router
