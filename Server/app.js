const express = require('express')
const app = express()
const errorMiddleWare = require('./Middleware/error.js')


app.use(express.json())


//route imports 
const product = require('./Routes/productroute.js')
const user = require('./Routes/userRoute.js')
//use routes
app.use('/api/v1', product)
app.use('/api/v1', user)

//middleware for error 
app.use(errorMiddleWare)


module.exports = app
