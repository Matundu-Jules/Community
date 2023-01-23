const authCtrl = require('../controllers/auth.controller')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', { info: 'Build with node.js, express, postgreSQL.' })
})

router.get('/users', authCtrl.displayUsers)

module.exports = router
