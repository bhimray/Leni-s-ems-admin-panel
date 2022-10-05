const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  status: { 
    type:String,
    enum: ['Received','Processing','Completed'], 
    required: true,
    default:'Received',
  },
  numberOfItems: { 
    type:String, 
    },
  customer: {
    type: String,
  },
  comment: {
    type: String,
  },
  deliveryTime:{
    type:String,
  }
}
);


module.exports = mongoose.model('Order', orderSchema);