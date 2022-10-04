const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { 
    type: String, 
    },
  service: {
    type: String,
  },
  user: {
    type: String,
  },
}
);


module.exports = mongoose.model('Order', orderSchema);