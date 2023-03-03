const {
    getPostQuery,
    getAllPostQuery,
    getCurrentUserPostWithFollowingQuery,
    createPostQuery,
    deletePostQuery,
    updatePostQuery,
} = require('../queries/post.queries')

// pug : display all posts
exports.postForm = (req, res) => {
    res.render('pages/posts/post-form', {
        posts: [],
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
        user: req.user,
    })
}

exports.postList = async (req, res, next) => {
    try {
        const posts = await getCurrentUserPostWithFollowingQuery(req.user)

        res.render('pages/posts/post', {
            posts,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
            editable: true,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.postCreate = async (req, res, next) => {
    try {
        const newPost = req.body
        newPost.content.trim()
        await createPostQuery({ ...newPost, authorid: req.user.id })

        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map((key) => err.errors[key].message)
        res.status(403).render('pages/posts/post-form', {
            posts: {},
            errors,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
        })
    }
}

// ctrl update post
exports.postEdit = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const posts = await getPostQuery(postId)

        res.render('pages/posts/post-form', {
            posts,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
        })
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
        const errors = Object.keys(err.errors).map((key) => err.errors[key].message)
        const posts = await getPostQuery(postId)
        res.status(400).render('pages/posts/post-form', {
            errors,
            posts,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
        })
    }
}

// crtl : delete post
exports.postDelete = async (req, res, next) => {
    try {
        const postId = req.params.postId
        await deletePostQuery(postId)
        const posts = await getCurrentUserPostWithFollowingQuery(req.user)

        res.render('pages/posts/post-list', {
            posts,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user: req.user,
            editable: true,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
