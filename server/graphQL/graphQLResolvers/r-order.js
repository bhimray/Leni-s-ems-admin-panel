const Order = require('../../models/Schema/order');
const User = require('../../models/Schema/user')
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;

module.exports = {
  createOrder:(argsO)=>{
    const args = argsO;
    const numberOfItems = args.numberOfItems;
    const comment = args.comment;

    //setting the default value: time, status and user (from database)
    const time= "< 24 hrs";
    const status = false;
    const user = User.UserId;
    

  }
}