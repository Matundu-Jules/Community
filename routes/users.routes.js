const { uploadProfileImg, userProfile, userSearchList } = require('../controllers/users.controller')

const router = require('express').Router()

// API
router.get('/', userSearchList) // display user in search bar menu
router.post('/update/image', uploadProfileImg) // Update profile img
router.get('/profile/:username', userProfile) // display user profile

module.exports = router
