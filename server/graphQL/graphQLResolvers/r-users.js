const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Schema/user');
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;

module.exports = {
    createUser: async args => {
        try {
            const hashedPassword = await bcrypt.hash(args.createUserInput.password, 12);
            console.log("password is hashed", typeof(hashedPassword))
            const user = await User({
                name: args.createUserInput.name,
                email: args.createUserInput.email,
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
        const email= args.loginInput.email
        const password = args.loginInput.password

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
            { userId: user.id, email: user.email },
            'somesupersecretkey',
            {
                expiresIn: '1h'
            }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
    }
};