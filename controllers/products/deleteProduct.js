const ProductsModel = require('../../models/products.model.js');

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await ProductsModel.findByIdAndDelete(productId);

    res.json({
      status: "OK",
      deletedProduct: deletedProduct
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = deleteProduct;