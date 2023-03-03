const { Post } = require('../config/postgresql.config')

exports.getAllPostQuery = () => {
    return Post.findAll()
}

exports.getCurrentUserPostWithFollowingQuery = (user) => {
    let currentUserPostWithFollowing

    if (user.following) {
        currentUserPostWithFollowing = [...user.following, user.id]
    } else {
        currentUserPostWithFollowing = [user.id]
    }

    return Post.findAll({ where: { author: currentUserPostWithFollowing } })
}

exports.getUserPostsFromUsername = (authorId) => {
    return Post.findAll({ where: { author: authorId } })
}

exports.createPostQuery = (post) => {
    return Post.create(post)
}

exports.deletePostQuery = (postId) => {
    return Post.destroy({ where: { id: postId } })
}

// get one post for modification
exports.getPostQuery = (postId) => {
    return Post.findByPk(postId)
}

exports.updatePostQuery = (postId, post) => {
    return Post.update({ content: post.content }, { where: { id: postId } })
}
