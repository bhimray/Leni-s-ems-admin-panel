const Order = require('../../models/Schema/order');
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;
module.exports = {
  createOrder: async args => {
    console.log("saving the order", args.name)
    const newOrder= await Order({
        name:args.name, amount:args.amount, service:args.service, user:args.user
    })
    console.log(newOrder)

    // recreating the connectio with mongodb and saving the data
    // error is still unknown, is it slow internet?
    async function run() {
      await mongoose.connect(MONGO_DB);
      await newOrder.save()
      console.log("data is saved")
    }
    run()
    ////////////////////

    console.log(newOrder)
    return newOrder
}
}