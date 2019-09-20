const router = require('express').Router();
const productsControllers = require('../../controllers/products');

router.get('/:productId', productsControllers.getProductById); // get product by id
router.get('/', productsControllers.getAllProducts); // get all products from db
router.post('/', productsControllers.createProduct); // create product
router.put('/:productId', productsControllers.updateProduct); // add to some product some filed
router.patch('/:productId', productsControllers.updateProduct); // update data in product by id 
router.delete('/:productId', productsControllers.deleteProduct); // delete product by id from db

module.exports = router;