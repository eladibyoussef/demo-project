const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        required:true,
        default: true
    }

}, {timesatamps:true});
module.exports = mongoose.model('Admin',AdminSchema);
