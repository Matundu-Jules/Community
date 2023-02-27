const router = require('express').Router()
const { protectedRoute } = require('../config/protectedRoutes.config')

const auth = require('./auth.routes')
const posts = require('./posts.routes')

router.use('/auth', auth)
router.use('/posts', protectedRoute, posts)

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/posts')
    } else {
        res.render('home')
    }
})

module.exports = router
