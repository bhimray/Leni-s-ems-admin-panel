const Order = require('../../models/Schema/order');
const User = require('../../models/Schema/user')
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;

module.exports = {
  createOrder: async (argsO, req)=>{
    console.log(req, "this is the req inside the createorder")
    if (!req.checkAuthorized){
      console.log(req.checkAuthorized,'is the authorized part')
      throw new Error("Your are not Unauthorized. Please sign in.");
    }
    const args = argsO;
    console.log(argsO, "this is argO")
    const numberOfItems = args.createOrderInput.numberOfItems;
    const comment = args.createOrderInput.comment;

    //setting the default value: time, status and user (from database)
    const time= "< 24 hrs";
    const status = false;
    const user = "john"
    console.log(`saving the order ${time, status, user}`)
    const order = await Order({
      numberOfItems:numberOfItems,
      status:status,
      customer:"John",
      deliveryTime:time,
      comment:comment,
    })
    
    await mongoose.connect(MONGO_DB).then(()=>{
      order.save();
    })
    console.log(`this is created order ${order}`)
    return order;

  }
}