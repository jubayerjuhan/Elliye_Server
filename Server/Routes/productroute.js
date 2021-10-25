const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../Controllers/productcontroller.js');
const { authorizeUser, authorizeRoles } = require('../Middleware/authorizeUser.js');
const router = express.Router();

router.route('/products').get(getAllproducts);
router.route('/product/new').post(authorizeUser, authorizeRoles('admin'), createProduct);
router.route('/product/:id')
  .delete(authorizeUser, authorizeRoles, deleteProduct)
  .get(getSingleProduct)
  .put(authorizeUser, authorizeRoles, updateProduct);

module.exports = router;
