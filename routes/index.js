const router = require('express').Router()

const auth = require('./auth.routes')
const posts = require('./posts.routes')

router.use('/auth', auth)
router.use('/posts', posts)

// Homepage
router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router
