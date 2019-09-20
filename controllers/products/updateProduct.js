const ProductsModel = require('../../models/products.model.js');

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updatedData = req.body;

  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      productId, 
      { 
        $set: updatedData 
      }, 
      {
        upsert: true
      }
    );

    res.json({
      status: "OK",
      products: updatedProduct
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = updateProduct;