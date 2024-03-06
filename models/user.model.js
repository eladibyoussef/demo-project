const mongoose = require('mongoose');
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
    isAdmin:{
        type: Boolean,
        required:true,
        default: false
    }
   //other feilds will be added later after the intial set of the main routes .
},

{timestamps:true});
module.exports = mongoose.model('User',UserSchema)
