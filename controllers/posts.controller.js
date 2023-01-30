const {
    getAllPostQuery,
    createPostQuery,
    deletePostQuery,
} = require('../queries/post.queries')

// pug : display all posts
exports.postList = async (req, res, next) => {
    try {
        const posts = await getAllPostQuery()

        res.render('pages/posts/post', { posts })
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
        await createPostQuery(newPost)

        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map(
            (key) => err.errors[key].message
        )
        res.status(400).render('pages/posts/post-form', { errors })
        // console.log(err)
        // res.status(400).render('pages/posts/post-form', { errors: err })
    }
}

// crtl : delete post
exports.postDelete = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const result = await deletePostQuery(postId)
        console.log(result)

        const posts = await getAllPostQuery()
        res.render('pages/posts/post-list', { posts })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
