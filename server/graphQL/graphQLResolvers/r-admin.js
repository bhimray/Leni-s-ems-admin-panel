const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Schema/admin');
const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_DB = process.env.MONGO_URI;

module.exports = {
    adminRegister: async argsO => {
        const args = argsO.adminInput;
        console.log(args)
        try {
            const hashedPassword = await bcrypt.hash(args.password, 15);
            console.log("password is hashed", typeof(hashedPassword))
            const admin = await Admin({
                name: args.name,
                email: args.email,
                password: hashedPassword,
                number:args.number
            });
            console.log(admin)
            // recreating the connectio with mongodb and saving the data
            // error is still unknown, is it slow internet?
            async function run() {
                await mongoose.connect(MONGO_DB).then(()=>{
                    admin.save();
                })
                console.log("user is saved")
            }
            run()
            ////////////////////
            //   console.log(user.name, user.email, user.password)
            //   await user.save();
            console.log("admin is recorded")
            return admin;

        }catch (err) {
            console.log("this is error", err)
            throw err;
        }
    },

    adminLogin: async (argsO) => {
        const args = argsO.adminInput
        const email= args.email
        const password = args.password

        const admin = await mongoose.connect(MONGO_DB).then(()=>{
            return Admin.findOne({ email: email });
        })
        console.log(admin)
        if (!admin) {
            throw new Error('Admin does not exist!');
        }
        const isEqual = await bcrypt.compare(password, admin.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: admin.id, email: admin.email },
            'dfsdk4$rsas8d#r38ridnfksdlfei48t94r9rf4r92m#e8d@',
            {
                expiresIn: '0.5h'
            }
        );
        return { user: admin.id, token: token, tokenExpiration: 1 };
    }
};