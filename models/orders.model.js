const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductsListSchema = require('./productsList.schema.js');

const OrderSchema = new Schema({
    "creator": {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    "productsList": [
      ProductsListSchema
    ],
    "deliveryType": {
        type: String,
        enum: ["delivery","office"]
    },
    "deliveryAddress": String,
    "sumToPay": Number,
    "status": {
        type: String,
        default: "inProgress",
        enum: ["inProgress", "declined", "finished", "failed"]
    }
   }, { timestamps: true });

const OrdersModel = mongoose.model("Orders", OrderSchema );

module.exports = OrdersModel;
