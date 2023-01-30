const Post = require('../models/post.model')

// verify if email is already exist
exports.getAllPostQuery = () => {
    return Post.findAll()
}

exports.createPostQuery = (post) => {
    return Post.create(post)
}

exports.deletePostQuery = (postId) => {
    return Post.destroy({ where: { id: postId } })
}
