const express = require('express')
const app = express()
const errorMiddleWare = require('./Middleware/error.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const path = require('path')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())
app.use(cors())

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resol)
})


//route imports 
const product = require('./Routes/productroute.js')
const user = require('./Routes/userRoute.js')
const order = require('./Routes/orderRoutes.js')
const payment = require('./Routes/paymentRoute.js')

//use routes
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', payment)

//middleware for error 
app.use(errorMiddleWare)


module.exports = app
