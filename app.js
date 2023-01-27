require('dotenv').config()
require('./config/scss.config')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

// Connection PostgreSQL

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
const authRoutes = require('./routes/auth.routes')
const postsRoutes = require('./routes/posts.routes')
app.use('/auth', authRoutes)
app.use('/post', postsRoutes)
app.get('/', (req, res) => {
    res.render('home')
})

// port
const port = process.env.PORT || 80
app.listen(port, (err) => {
    if (err) console.log(err)
    console.log('server port :', port)
})
