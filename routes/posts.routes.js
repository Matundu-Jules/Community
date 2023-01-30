const {
    postCreate,
    postList,
    postForm,
    postDelete,
    postGetAll,
} = require('../controllers/posts.controller')

const router = require('express').Router()

// Routing pug
router.get('/', postList)
router.get('/new', postForm)

// API
router.post('/', postCreate)
router.delete('/:postId', postDelete)

module.exports = router
