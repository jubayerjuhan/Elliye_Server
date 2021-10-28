const express = require('express')
const app = express()
const errorMiddleWare = require('./Middleware/error.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')


app.use(express.json())
app.use(cookieParser())
app.use(cors())


//route imports 
const product = require('./Routes/productroute.js')
const user = require('./Routes/userRoute.js')
const order = require('./Routes/orderRoutes.js')

//use routes
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

//middleware for error 
app.use(errorMiddleWare)


module.exports = app
