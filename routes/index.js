const router = require('express').Router()
const { protectedRoute } = require('../config/protectedRoutes.config')

const auth = require('./auth.routes')
const posts = require('./posts.routes')
const users = require('./users.routes')

router.use('/auth', auth) // Authentication
router.use('/posts', protectedRoute, posts) // Posts
router.use('/users', protectedRoute, users) // Users infos

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/posts')
    } else {
        res.render('home')
    }
})

module.exports = router
