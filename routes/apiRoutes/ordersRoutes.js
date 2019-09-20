const router = require('express').Router();
const ordersControllers = require('../../controllers/orders');

router.get('/:orderId', ordersControllers.getOrderById); // get order by id
router.get('/:userId', ordersControllers.getAllOrdersByUserId); // get all orders by user id from db
router.post('/', ordersControllers.createOrder); // create product
router.put('/:orderId', ordersControllers.updateOrder); // add to some product some filed
router.patch('/:orderId', ordersControllers.updateOrder); // update data in product by id 
router.delete('/:orderId', ordersControllers.deleteOrder); // delete product by id from db

module.exports = router;