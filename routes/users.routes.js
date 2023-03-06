const {
    uploadProfileImg,
    userProfile,
    userSearchList,
    userFollow,
    userUnfollow,
} = require('../controllers/users.controller')

const router = require('express').Router()

// API
router.get('/', userSearchList) // display user in search bar menu
router.post('/update/image', uploadProfileImg) // Update profile img
router.get('/profile/:username', userProfile) // display user profile
router.get('/follow/:userId', userFollow) // follow user
router.get('/unfollow/:userId', userUnfollow) // unfollow user

module.exports = router
