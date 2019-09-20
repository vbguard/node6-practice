const ProductsModel = require('../../models/products.model.js');

const getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const findProduct = await ProductsModel.findById(productId, {'__v': 0 });
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      user: findProduct
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