const { getUsersQuery } = require('../queries/auth.queries')

// display all users
exports.displayUsers = async (req, res, next) => {
    try {
        const users = await getUsersQuery()
        console.log(users)
        res.status(200).render('pages/users', { users })
    } catch (err) {
        next(err)
    }
}
