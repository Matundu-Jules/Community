const db = require('../config/postgresql.config')

// const newUser = {
//     email: 'george2@example.com',
//     pseudo: 'Jerry',
//     password: '123',
// }

// const getUsers = async (req, res, next) => {
//     try {
//         const queryGetUsers = await db.query(
//             'SELECT * FROM users ORDER BY id ASC'
//         )
//     } catch (err) {
//         console.error(err)
//     }
// }

// getUsers()

exports.getUsersQuery = async () => {
    try {
        const users = await db.query('SELECT * FROM users ORDER BY id ASC')
        return users.rows
    } catch (err) {
        next(err)
    }
}
