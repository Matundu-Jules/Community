const upload = require('../config/multer.config')
const fs = require('fs')
const path = require('path')

// POST : Update profile img
exports.uploadProfileImg = [
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = req.user
            const oldImage = user.avatar.split('http://localhost:8080').pop() // get path off previous profile img
            const pathOldImage = path.join(__dirname, `../${oldImage}`)

            if (user.avatar.includes('default-profile')) {
                // Update image
                user.avatar = `${process.env.IMAGESFOLDER}/avatars/${req.file.filename}`
                await user.save()
            } else {
                // Update image
                user.avatar = `${process.env.IMAGESFOLDER}/avatars/${req.file.filename}`
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
