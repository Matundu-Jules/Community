require('dotenv').config()
require('./modules/scss-config')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

// views config
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// http request logger
app.use(morgan('dev'))

// static middleware for files
app.use(express.static(path.join(__dirname, 'public')))

// get data from req.body in all application for all routes.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
const index = require('./routes')
app.use(index)

// port
const port = process.env.PORT || 80
app.listen(port, (err) => {
    if (err) console.log(err)
    console.log('server port :', port)
})
