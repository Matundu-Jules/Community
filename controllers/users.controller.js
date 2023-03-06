const upload = require('../config/multer.config')
const fs = require('fs')
const path = require('path')
const {
    findUserPerUsername,
    searchUsersPerUsername,
    addUserIdToCurrentUserFollowing,
    findUserPerIdQuery,
    deleteUserIdToCurrentUserFollowing,
} = require('../queries/users.queries')
const { findPostsByAuthorId } = require('../queries/post.queries')

// POST : Update profile img
exports.uploadProfileImg = [
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = req.user
            const oldImage = user.avatar.split(process.env.URLWEBSITE).pop() // get path off previous profile img
            const pathOldImage = path.join(__dirname, `../${oldImage}`)

            if (user.avatar.includes('default-profile')) {
                // Update image
                user.avatar = `/public/images/avatars/${req.file.filename}`
                await user.save()
            } else {
                // Update image
                user.avatar = `/public/images/avatars/${req.file.filename}`
                await user.save()

                // Delete previous profile img
                fs.unlink(pathOldImage, (err) => {
                    if (err) throw err

                    console.log('Previous profile image is delete !')
                })
            }

            res.redirect('/') // Reload the page
        } catch (err) {
            next(err)
        }
    },
]

// GET : display user profile
exports.userProfile = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await findUserPerUsername(username)

        const posts = await findPostsByAuthorId(user.id)

        console.log('FOLLOWING : ', user.following)
        console.log('CURRENT FOLLOWING : ', req.user.following)

        res.render('pages/posts/post', {
            posts,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user,
            editable: req.user.username === username ? true : false,
        })
    } catch (err) {
        next(err)
    }
}

// GET : display user in search bar menu
exports.userSearchList = async (req, res, next) => {
    try {
        const search = req.query.search
        const users = await searchUsersPerUsername(search)

        res.render('includes/search-menu', { users })
    } catch (err) {
        next(err)
    }
}

// GET : follow user
exports.userFollow = async (req, res, next) => {
    try {
        const userId = req.params.userId

        // ignore first value in array and get the second in user
        const [, user] = await Promise.all([
            addUserIdToCurrentUserFollowing(req.user, userId),
            findUserPerIdQuery(userId),
        ])

        res.redirect(`/users/profile/${user.username}`)
    } catch (err) {
        next(err)
    }
}

// GET : unfollow user
exports.userUnfollow = async (req, res, next) => {
    try {
        const userId = req.params.userId

        // ignore first value in array and get the second in user
        const [, user] = await Promise.all([
            deleteUserIdToCurrentUserFollowing(req.user, userId),
            findUserPerIdQuery(userId),
        ])

        res.redirect(`/users/profile/${user.username}`)
    } catch (err) {
        next(err)
    }
}
