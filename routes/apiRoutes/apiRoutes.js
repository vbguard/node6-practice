const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const productsRoutes = require('./productsRoutes');
const ordersRoutes = require('./ordersRoutes');

router.use('/user', userRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.get('/transaction/:date/balance/all', (req, res) => {
  console.log(req.params);
})

module.exports = router;