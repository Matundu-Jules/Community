const authCtrl = require('../controllers/auth.controller')
const router = require('express').Router()

// maybe add module yup validations in folder validations/userValidation.js for check signin/signup forms

// POST : create account
router.post('/signup', authCtrl.userSignup)

// POST : Connection
// router.post('/login', authCtrl.userLogin)

module.exports = router
