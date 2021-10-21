const express = require('express')
const app = express()
const errorMiddleWare = require('./Middleware/error.js')

app.use(express.json())


//route imports 
const product = require('./Routes/productroute.js')

//use routes
app.use('/api/v1', product)

//middleware for error 
// app.use(errorMiddleWare)


module.exports = app
