const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema =new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    resetToken:{
        type:String,
        default: undefined
    },
    resetTokenExpiration:{
        type:Date,
        default: undefined
    },
    passwordUpdatedAt:{
        type:Date,
        default:undefined
    }
},

{timestamps:true});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = mongoose.model('User',UserSchema)
