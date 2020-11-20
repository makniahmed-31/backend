const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    productCtg: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required:true
    },
    productDesc: {
        type: String,
        required:true
    },
    productPrice: {
        type: Number,
        required:true
    },
    productSts: {
        type: String,
        default:"Pending"
    },
    date: {
        type:Date,
        default: Date.now
    }

});

module.exports = Product = mongoose.model('product',ProductSchema);