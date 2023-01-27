const { postCreate, postGetAll } = require('../controllers/posts.controller')

const router = require('express').Router()

// Routing pug
router.get('/', postGetAll)
router.get('/new', (req, res) => {
    res.render('pages/posts/post-form')
})

// API
router.post('/', postCreate)

module.exports = router
