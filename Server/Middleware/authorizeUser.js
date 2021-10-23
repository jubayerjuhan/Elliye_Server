const ErrorHandler = require('../Utils/errorHandler.js')
const User = require('../Models/userModel.js')
const jwt = require('jsonwebtoken')
const authorizeUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) return next(new ErrorHandler('Please Login First', 401));
  const decodeData = jwt.verify(token, process.env.JWT_SECRET)
  if (!decodeData) return next(new ErrorHandler('You Messed your cookie', 404));
  req.user = User.findById(decodeData.id)
  next()
}

module.exports = authorizeUser;