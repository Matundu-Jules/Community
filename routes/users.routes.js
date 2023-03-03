const { uploadProfileImg, userProfile } = require('../controllers/users.controller')

const router = require('express').Router()

// API
router.post('/update/image', uploadProfileImg) // Update profile img
router.get('/profile/:username', userProfile) // display user profile

module.exports = router
