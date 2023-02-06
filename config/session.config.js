const session = require('express-session')
const { sequelize } = require('./postgresql.config')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { app } = require('../app')

// create store
const sessionStore = new SequelizeStore({
    db: sequelize,
})

// create/config session and cookie
app.use(
    session({
        name: 'sessionId',
        secret: process.env.SESSIONSECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 172800000, // = 2 days
        },
    })
)

// sync store
// sessionStore
//     .sync({ alter: true })
//     .then(() => {
//         console.log('session store sync !')
//     })
//     .catch((err) => {
//         throw err
//         next(err)
//     })
