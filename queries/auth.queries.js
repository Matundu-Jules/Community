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

// get all users
exports.getUsersQuery = async () => {
    try {
        const users = await db.query('SELECT * FROM users ORDER BY id ASC')
        return users.rows
    } catch (err) {
        throw new Error('getUsersQuery')
    }
}

// verify if email is already exist
exports.emailVerify = async (newEmail) => {
    try {
        const email = await db.query(
            'SELECT email FROM users WHERE email = $1',
            [newEmail]
        )
        if (!email) {
            throw new Error('Email exist')
        }
        console.log(email.rows)
        return email.rows
    } catch (err) {
        throw new Error('emailVerify')
    }
}

// verify if pseudo is already exist
exports.pseudoVerify = async (newPseudo) => {
    try {
        const pseudo = await db.query(
            'SELECT pseudo FROM users WHERE pseudo = $1',
            [newPseudo]
        )
        if (!pseudo) {
            throw new Error('Pseudo exist')
        }
        console.log(pseudo.rows)
        return pseudo.rows
    } catch (err) {
        throw new Error('pseudoVerify')
    }
}

// create user
exports.createUser = async (newUser) => {
    try {
        const { pseudo, email, password } = newUser
        const userCreated = await db.query(
            'INSERT INTO users (pseudo, email, password) VALUES ($1, $2, $3)',
            [pseudo, email, password]
        )
        console.log('pseudo, email, password :', pseudo, email, password)
        console.log(userCreated.rows)
        // res.json(userCreated.rows)
        // console.log(userCreated.rows)
    } catch (err) {
        throw new Error('createUser')
    }
}
