const ProductsModel = require('../../models/products.model.js');

const getProductById = async (req, res) => {
  /**
   * TODO:
   *  get query and filtering result
   */

  try {
    const findAllProducts = await ProductsModel.find({}, {'__v': 0 });

    res.json({
      status: "OK",
      products: findAllProducts
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = getProductById;