const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    email: String,
    password: String, 
    transactions: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Transactions"
        }
    ]
}, { timestamps: true });

const UsersModel = mongoose.model("Users", UserSchema );

module.exports = UsersModel;