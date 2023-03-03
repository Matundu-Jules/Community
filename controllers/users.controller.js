const upload = require('../config/multer.config')
const fs = require('fs')
const path = require('path')
const { findUserPerUsername } = require('../queries/users.queries')
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
