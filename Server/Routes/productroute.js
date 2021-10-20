const express = require('express');
const { getAllproducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../Controllers/productcontroller.js');
const router = express.Router();

router.route('/products').get(getAllproducts);
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct).get(getSingleProduct);

module.exports = router;
