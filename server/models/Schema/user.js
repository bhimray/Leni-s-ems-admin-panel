const mongoose = require("mongoose")
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please provide name']},
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        }
    }
    ,
    password:{
        type:String,
        // required:[true, 'Please provide password'],
        // minlength:[3, 'Password must be of length atleast six characters']
    }
  }
  );
  
  
  module.exports = mongoose.model('User', userSchema);