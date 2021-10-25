const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter a Product Name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please Enter a Product Description']
  },
  price: {
    type: Number,
    required: [true, 'Please Enter a Product Price'],
    maxLength: [8, "Price can't exceed 8 chars"]
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please Enter a Product Category']
  },
  stock: {
    type: Number,
    required: [true, 'Please Enter a Product Stock'],
    maxLength: [4, 'Stock cant be exceeded more than 4 characters'],
    default: 1,
  },
  numOfReview: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,

  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('product', productSchema)