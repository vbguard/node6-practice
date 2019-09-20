const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductListSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products"
    },
    productType: {
      type: String,
      enum: ["M", "XL", "XXL"]
    },
    itemsCount: Number
  },
  { timestamps: false, _id: false }
);

module.exports = ProductListSchema;
