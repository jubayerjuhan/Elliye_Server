const Product = require('../Models/productmodel.js')
const ErrorHandler = require('../Utils/errorHandler.js')
const catchAsyncError = require('../Middleware/catchAsyncError.js');
const ApiFeature = require('../Utils/apiFeature.js');

/**
 * *Creating Product
 * ?Only Admin Access
 */
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body)
  if (!product) return next(new ErrorHandler('Couldnt create product', 409))
  res.status(201).json({
    success: true,
    product
  })
});

/**
 * *Get Reading/Getting Product
 * 
 */
exports.getAllproducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const searchProducts = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  const products = await searchProducts.query

  res.status(200).json({
    success: true,
    products,
    productCount
  })
})

/**
 * *update product 
 * ?Only Admin Access
 */
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id)
  if (!product) return next(new ErrorHandler('Product Not Found', 404));
  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true, runValidators: true, useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    product
  })
})

/**
 * *Delete Product from the Database
 */

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) return next(new ErrorHandler('Product not found', 404))
  product.remove()
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  })

})

/**
 * *Get a single product by id
 */

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) return next(new ErrorHandler('Product not found', 404))
  res.status(200).json({
    success: true,
    product
  })
})