const express = require('express');
const { placeOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../Controllers/orderController.js');
const { authorizeUser, authorizeRoles } = require('../Middleware/authorizeUser.js');
const router = express.Router()

router.route('/order/new').post(authorizeUser, placeOrder)
router.route('/order/:id').get(authorizeUser, getSingleOrder)
router.route('/my-orders').get(authorizeUser, myOrders)

//--> Admin <--//
router.route('/admin/orders').get(authorizeUser, authorizeRoles('admin'), getAllOrders)
router.route('/admin/order/:id')
  .put(authorizeUser, authorizeRoles('admin'), updateOrder)
  .delete(authorizeUser, authorizeRoles('admin'), deleteOrder)

module.exports = router;