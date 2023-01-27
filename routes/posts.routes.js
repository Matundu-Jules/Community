const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('pages/posts/post-list')
})

module.exports = router
