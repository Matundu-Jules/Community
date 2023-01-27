const Post = require('../models/post.model')
const { postGetAllQuery } = require('../queries/post.queries')

// Create user
exports.postCreate = async (req, res, next) => {
    /* ERROR HANDLER */
    let errorsPostCreate = ''

    try {
        const body = req.body
        const newPost = await Post.create(body)

        res.redirect('/')
    } catch (err) {
        if (err.errors) {
            err.errors.map((key) => {
                if (key.path === 'content') {
                    errorsPostCreate = key.message
                    console.log('errorsPostCreate : ', key.message)
                }
            })

            res.status(400).render('pages/posts/post-form', {
                errors: errorsPostCreate,
            })
        } else {
            console.log(err)
            res.status(400).render('pages/posts/post-form', {
                errors: 'Test',
            })
        }
    }
}

exports.postGetAll = async (req, res, next) => {
    try {
        const posts = await postGetAllQuery()

        res.render('pages/posts/post-list', { posts })
    } catch (err) {
        next(err)
    }
}
