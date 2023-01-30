const Post = require('../models/post.model')
const { postGetAllQuery, createPost } = require('../queries/post.queries')

// Create post
exports.postCreate = async (req, res, next) => {
    /* ERROR HANDLER */
    let errorsPostCreate = ''

    try {
        const body = req.body
        await createPost(body)

        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map(
            (key) => err.errors[key].message
        )
        console.log(errors)
        res.status(400).render('pages/posts/post-form', { errors })
    }
}

exports.postForm = (req, res) => res.render('pages/posts/post-form')

exports.postGetAll = async (req, res, next) => {
    try {
        const posts = await postGetAllQuery()

        res.render('pages/posts/post-list', { posts })
    } catch (err) {
        next(err)
    }
}
