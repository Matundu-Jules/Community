const router = require('express').Router()

const { ensureAuthenticated } = require('../controllers/security.controllers')
const auth = require('./auth.routes')
const posts = require('./posts.routes')

router.use('/auth', auth)
router.use('/posts', ensureAuthenticated, posts)

router.get('/', (req, res) => {
    if (req.isAuthenticated) {
        res.redirect('/posts')
    } else {
        res.render('home')
    }
})

module.exports = router
