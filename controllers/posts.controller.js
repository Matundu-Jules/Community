const {
    getPostQuery,
    getAllPostQuery,
    createPostQuery,
    deletePostQuery,
    updatePostQuery,
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

// ctrl : create post
exports.postForm = (req, res) => {
    res.render('pages/posts/post-form', { post: {} })
}

exports.postCreate = async (req, res, next) => {
    try {
        const newPost = req.body
        newPost.content.trim()
        await createPostQuery(newPost)

        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map(
            (key) => err.errors[key].message
        )
        res.status(403).render('pages/posts/post-form', { post: {}, errors })
    }
}

// ctrl update post
exports.postEdit = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await getPostQuery(postId)

        res.render('pages/posts/post-form', { post })
    } catch (err) {
        next(err)
    }
}
exports.postUpdate = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const body = req.body
        await updatePostQuery(postId, body)

        res.redirect('/posts')
    } catch (err) {
        const errors = Object.keys(err.errors).map(
            (key) => err.errors[key].message
        )
        const post = await getPostQuery(postId)
        res.status(400).render('pages/posts/post-form', { errors, post })
    }
}
