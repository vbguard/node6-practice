const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    email: String,
    password: String,
    facebookId: String,
    googleId: String,
    favoriteProducts: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Products"
        }
    ], 
    viewedProducts: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Products"
        }
    ], 
    orders: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Orders"
        }
    ]
}, { timestamps: true });

const UsersModel = mongoose.model("Users", UserSchema );

module.exports = UsersModel;