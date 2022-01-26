const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipcode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },

      _id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    }
  },
  paidAt: {
    type: Date,
    required: true,
  },
  priceBreakdown: {
    subtotal: {
      type: Number,
      default: 0,
      required: true,
    },
    gst: {
      type: Number,
      default: 0,
      required: true,
    },
    shippingCharge: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing'
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Order', orderSchema);