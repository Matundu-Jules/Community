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

exports.getPostQuery = (postId) => {
    return Post.findByPk(postId)
}
exports.updatePostQuery = (postId, post) => {
    return Post.update({ content: post.content }, { where: { id: postId } })
}
