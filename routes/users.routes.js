const { uploadProfileImg } = require('../controllers/users.controller')

const router = require('express').Router()

// API
router.post('/update/image', uploadProfileImg) // Update profile img

module.exports = router
