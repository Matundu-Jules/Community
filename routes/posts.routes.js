const {
    postCreate,
    postGetAll,
    postForm,
    postDelete,
} = require('../controllers/posts.controller')

const router = require('express').Router()

// Routing pug
router.get('/', postGetAll)
router.get('/new', postForm)

// API
router.post('/', postCreate)
router.delete('/:postId', postDelete)

module.exports = router
