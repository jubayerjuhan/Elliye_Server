const catchAsyncError = require('../Middleware/catchAsyncError.js')
const Order = require('../Models/orderModel.js');
const Product = require('../Models/productmodel.js');
const ErrorHandler = require('../Utils/errorHandler.js');

/**
 * *Place order api
 */
exports.placeOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    priceBreakdown,
  } = req.body;
  console.log(req.body)

  const order = await Order.create({
    shippingInfo,
    orderItems,

    paymentInfo,
    priceBreakdown,
    user: req.user._id,
    paidAt: Date.now(),
  })

  res.status(201).json({
    success: true,
    order
  })
})

/**
 * *Get Single Order Status
 */
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if (!order) return next(new ErrorHandler('Order not found', 404))

  res.status(200)
    .json({
      success: true,
      order
    })
})

/**
 * *Get My All Orders
 */

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json({
    success: true,
    orders
  })
})

/**
 * ?Admin Router 
 * *Get All Orders
 */
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find()
  let orderValue = 0;
  orders.forEach((order) => orderValue += order.priceBreakdown.totalPrice)

  res.status(200).json({
    success: true,
    orders,
    orderValue
  })
})

/**
 * ?Admin routes 
 * *update order
 */
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) return next(new ErrorHandler('Order not found', 404))
  console.log(order)

  if (order.orderStatus === 'Delivered') return next(new ErrorHandler('Order already delivered'))

  order.orderStatus = req.body.status;
  if (req.body.status === 'Delivered') order.deliveredAt = Date.now()
  if (order.orderStatus === 'Shipped') order.shippedAt = Date.now()


  const updateStock = async (id, quantity) => {
    const product = await Product.findById(id)
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }
  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async item => {
      await updateStock(item.product, item.quantity)
    })
  }


  await order.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
    order
  })
})

/**
 * ! Delete Order 
 */
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) return next(new ErrorHandler('Order not found', 404))
  await order.remove()

  res.status(200).json({
    success: true,
    message: 'Order Delete Successful'
  })

})