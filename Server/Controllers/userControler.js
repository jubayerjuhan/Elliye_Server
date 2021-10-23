const ErrorHandler = require('../Utils/errorHandler.js')
const catchAsyncError = require('../Middleware/catchAsyncError.js');
const User = require('../Models/userModel.js');
const sendJwtToken = require('../Utils/sendAndSaveJtwToken.js');

/**
 * *Register User 
 */

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this is a sample id',
      url: 'this is a sample url'
    }
  })

  sendJwtToken(user, 201, res)
})

/**
 * *Login User
 */

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return next(new ErrorHandler('Please Enter Email and Password', 400));

  const user = await User.findOne({ email }).select('+password')
  if (!user) return next(new ErrorHandler('Invalid Email or Password', 401));

  const isPasswordMatched = await user.comparePassword(password)
  console.log(isPasswordMatched)
  if (!isPasswordMatched) return next(new ErrorHandler('Invalid Email or Password', 401));

  sendJwtToken(user, 200, res)
})

/**
 * !Logout User
 */

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: 'User logged out'
  })
})