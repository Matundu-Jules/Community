const path = require('path')
const fs = require('fs')
const sass = require('sass')

// scss config
const scssCompiled = sass.compile(
    path.join(__dirname, '../public/scss/index.scss')
)
const pathStylesCss = path.join(__dirname, '../public/css/main.css')

fs.writeFile(pathStylesCss, scssCompiled.css, (err) => {
    if (err) console.log(err)
    console.log('SCSS compiled in public/css/main.css is done')
})
