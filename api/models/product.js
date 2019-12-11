const mongoose = require('mongoose');

/**
 * Create new product schema
 */

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema);