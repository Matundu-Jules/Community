const {
    postCreate,
    postGetAll,
    postForm,
} = require('../controllers/posts.controller')

const router = require('express').Router()

// Routing pug
router.get('/', postGetAll)
router.get('/new', postForm)

// API
router.post('/', postCreate)

module.exports = router
