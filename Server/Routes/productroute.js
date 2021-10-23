const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../Controllers/productcontroller.js');
const authorizeUser = require('../Middleware/authorizeUser.js');
const router = express.Router();

router.route('/products').get(getAllproducts);
router.route('/product/new').post(authorizeUser, createProduct);
router.route('/product/:id').put(authorizeUser, updateProduct);
router.route('/product/:id').delete(authorizeUser, deleteProduct).get(getSingleProduct);

module.exports = router;
