const mongoose = require('mongoose');
const ProductSchema =new  mongoose.Schema({

    model :{
        type:String,
        required:true
    },
    brand :{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    gender :{
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    createdAt :{
        type:Date,
        default: Date.now()
    },
    
});

module.exports = mongoose.model('Product',ProductSchema);
