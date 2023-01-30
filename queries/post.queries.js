const Post = require('../models/post.model')

// verify if email is already exist
exports.postGetAllQuery = () => {
    return Post.findAll()
}

exports.createPost = (post) => {
    return Post.create(post)
}
