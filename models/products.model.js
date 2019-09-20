const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productType: {
        type: String,
        enum: ["M", "XL", "XXL"]
    },
    itemsCount: Number,
    productTitle: String,
    productDescription: String,
    productColor: String,
    likes: Number
}, { timestamps: true });

const ProductsModel = mongoose.model("Products", ProductSchema );

module.exports = ProductsModel;