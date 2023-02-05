require('dotenv').config()
require('./config/scss.config')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const errorHandler = require('errorhandler')

// create/export express app
const app = express()
exports.app = app

// sessions/passport config
require('./config/session.config')
require('./config/passport.config')

// views config
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// http request logger
app.use(morgan('dev'))

// static middleware for files
app.use('/public', express.static(path.join(__dirname, 'public')))

// get data from req.body in all application for all routes.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
const routing = require('./routes')
app.use(routing)

// development config
if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
} else {
    // in production return only errors for users
    app.use((err, req, res, next) => {
        const code = err.code || 500
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message,
        })
    })
}

// port
const port = process.env.PORT || 80
app.listen(port, (err) => {
    if (err) console.log(err)
    console.log('server port :', port)
})
