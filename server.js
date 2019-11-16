const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const Routes = require('./api/routes')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/api', Routes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(results => {
        const PORT = process.env.PORT || 3030
        app.listen(PORT, function () {
            console.log('Your node js server is running on port ' + PORT)
        })
    }).catch(err => {
        console.log(err)
    })
