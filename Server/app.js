const express = require('express')
const app = express()
const errorMiddleWare = require('./Middleware/error.js')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())


//route imports 
const product = require('./Routes/productroute.js')
const user = require('./Routes/userRoute.js')
//use routes
app.use('/api/v1', product)
app.use('/api/v1', user)

//middleware for error 
app.use(errorMiddleWare)


module.exports = app
