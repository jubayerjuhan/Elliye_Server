const ErrorHandler = require('../Utils/errorHandler.js')
const catchAsyncError = require('../Middleware/catchAsyncError.js');
const User = require('../Models/userModel.js');

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

  const token = await user.getJwtToken()
  res.status(201).json({
    success: true,
    token
  })
})