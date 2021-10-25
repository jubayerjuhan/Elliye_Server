const ErrorHandler = require('../Utils/errorHandler.js')
const catchAsyncError = require('../Middleware/catchAsyncError.js');
const User = require('../Models/userModel.js');
const sendJwtToken = require('../Utils/sendAndSaveJtwToken.js');
const crypto = require('crypto');
const { sendResetPassEmail } = require('../Utils/JetmailEmail.js');

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

/**
 * !user reset password
 */

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return next(new ErrorHandler('User Not Found', 404));

  /**
   * *get password reset token
   */
  const resetToken = await user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
  const message = `Your Password Reset token is : \n\n ${resetPasswordUrl}\n\n please ignore this if you did not make this req`

  try {
    /**
     * *Jetmail Email Sending function => send resetpassword mail
     */
    sendResetPassEmail(req.body.email, message, res)
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(error.message), error, 500)
  }
})

/**
 * !reset password
 */
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest('hex')
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  console.log(user)
  if (!user) return next(new ErrorHandler('Invalid Password Reset Token or Token Session Expired', 400))
  if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("Password Doesn't Match", 403))

  user.password = req.body.password
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save()

  sendJwtToken(user, 200, res)
})
