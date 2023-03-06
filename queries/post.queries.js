const { Post, User, sequelize } = require('../config/postgresql.config')

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

    return Post.findAll({
        where: { authorid: currentUserPostWithFollowing },
        include: [{ model: User, as: 'author' }],
        order: [['createdAt', 'DESC']],
    })
}

exports.findPostsByAuthorId = (authorid) => {
    return Post.findAll({
        where: { authorid: authorid },
        include: [{ model: User, as: 'author' }],
        order: [['createdAt', 'DESC']],
    })
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
