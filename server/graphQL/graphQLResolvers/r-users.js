const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Schema/user');
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;

module.exports = {
    createUser: async args => {
        console.log("hi, create user")
        console.log(args,args.password,'this is args in inside the createUser')
        try {
            const hashedPassword = await bcrypt.hash(args.password, 12);
            console.log("password is hashed", typeof(hashedPassword))
            const user = await User({
                name: args.name,
                email: args.email,
                password: hashedPassword
            });
            console.log(user)
            // recreating the connectio with mongodb and saving the data
            // error is still unknown, is it slow internet?
            async function run() {
                await mongoose.connect(MONGO_DB).then(()=>{
                    user.save();
                })
                console.log("user is saved")
            }
            run()
            ////////////////////
            //   console.log(user.name, user.email, user.password)
            //   await user.save();
            console.log("result is saved")
            return user;

        }catch (err) {
            console.log("this is error", err)
            throw err;
        }
    },

    login: async (args) => {
        console.log(args, "this is args in login")
        const email= args.email
        const password = args.password

        const user = await mongoose.connect(MONGO_DB).then(()=>{
            return User.findOne({ email: email });
        })
        console.log(user)
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { user: user.id, email: user.email },
            'r38ridnfksdlfei48t94r9rf4r92m',
            {
                expiresIn: '1h'
            }
        );
        return { user: user.id, token: token, tokenExpiration: 1 };
    }
};