const Post = require('../models/post.model')
const { postGetAllQuery, createPost } = require('../queries/post.queries')
const { post } = require('../routes/posts.routes')

// pug : display all posts
exports.postGetAll = async (req, res, next) => {
    try {
        const posts = await postGetAllQuery()

        res.render('pages/posts/post-list', { posts })
    } catch (err) {
        next(err)
    }
}

// pug : display create post form
exports.postForm = (req, res) => res.render('pages/posts/post-form')

// ctrl : create post
exports.postCreate = async (req, res, next) => {
    try {
        const newPost = req.body
        await createPost(newPost)

        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map(
            (key) => err.errors[key].message
        )
        console.log(errors)
        res.status(400).render('pages/posts/post-form', { errors })
    }
}

// crtl : delete post
exports.postDelete = async (req, res, next) => {
    try {
        const postId = req.params.postId
        await deletePost(postId)
        res.end()
    } catch (err) {
        next(err)
    }
}
