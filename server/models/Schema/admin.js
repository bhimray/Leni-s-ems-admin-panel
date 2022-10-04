
const mongoose = require("mongoose")
const validator = require('validator')

const adminSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please provide name']},
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        }
    },
    number:{
        type:String,
        require:[true, 'Please provide a mobile number']
    }
    ,
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:[6, 'Password must be of length atleast six characters']
    }
  }
  );
  
  
  module.exports = mongoose.model('Admin', adminSchema);