const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `../public/images/avatars`))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }),
})

module.exports = upload
