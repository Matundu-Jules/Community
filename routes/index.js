const router = require('express').Router()

const auth = require('./auth.routes')
const posts = require('./posts.routes')
const users = require('./users.routes')

router.use('/auth', auth)
router.use('/posts', posts)
router.use('/users', users)

router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router
