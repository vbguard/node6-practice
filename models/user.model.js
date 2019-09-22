const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
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
    ],
    token: String,
    profileImage: String,
    facebookId: String,
    googleId: String
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = function(password) {
  const doc = this;
  const diff = doc.password === password;
  return diff;
};

UserSchema.methods.getJwt = function() {
  const user = this;
  const token = jwt.sign({ id: user._id, email: user.email }, "secret_key", {
    expiresIn: 100
  });
  user.token = token;
  user.save().catch(err => {
    throw new Error(err);
  });
  return token;
};

UserSchema.plugin(findOrCreate);

const UsersModel = mongoose.model("Users", UserSchema);

module.exports = UsersModel;
