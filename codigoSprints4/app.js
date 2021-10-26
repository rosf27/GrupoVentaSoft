'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require ('./routes')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.engine('.hbs',hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api', api)
app.get("/login", (req, res) => {
    res.render('login')
})

app.get("/", (req, res) => {
    res.render('producto')
})

module.exports = app
