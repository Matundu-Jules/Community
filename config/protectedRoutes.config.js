// Middleware for protected routes
exports.protectedRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/auth/signin/form')
    }
}
