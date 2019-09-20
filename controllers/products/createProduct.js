const ProductsModel = require('../../models/products.model.js');

const createProduct = async (req, res) => {
  const newProductData = req.body;

  try {
    const newProduct = await new ProductsModel(newProductData);

    newProduct.save( (err, result) => {
      res.json({
        status: "OK",
        product: result
      })
    });
    
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = createProduct;