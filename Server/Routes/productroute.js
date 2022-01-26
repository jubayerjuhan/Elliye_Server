const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, allAdminProduct, getSingleProduct, addRating, getAllReviews, deleteReview } = require('../Controllers/productcontroller.js');
const { authorizeUser, authorizeRoles } = require('../Middleware/authorizeUser.js');
const router = express.Router();

router.route('/products').get(getAllproducts);
router.route('/admin/product/new').post(authorizeUser, authorizeRoles('admin'), createProduct);
router.route('/admin/allProducts').get(allAdminProduct);
router.route('/admin/product/:id')
  .delete(authorizeUser, authorizeRoles('admin'), deleteProduct)
  .put(authorizeUser, authorizeRoles('admin'), updateProduct);

router.route('/product/:id').get(getSingleProduct)
router.route('/review').put(authorizeUser, addRating)
router.route('/reviews').get(getAllReviews).delete(authorizeUser, deleteReview)


module.exports = router;
