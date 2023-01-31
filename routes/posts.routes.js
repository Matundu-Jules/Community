const {
    postCreate,
    postList,
    postForm,
    postDelete,
    postEdit,
    postUpdate,
} = require('../controllers/posts.controller')

const router = require('express').Router()

// Routing pug
router.get('/', postList)
router.get('/new', postForm)
router.get('/edit/:postId', postEdit)

// API
router.post('/', postCreate)
router.post('/update/:postId', postUpdate)
router.delete('/:postId', postDelete)

module.exports = router
