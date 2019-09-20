const OrdersModel = require('../../models/orders.model.js');
const Users = require('../../models/user.model.js');

const createOrder = async (req, res) => {
  const newOrderData = req.body;

  try {
    const newOrder = await new OrdersModel(newOrderData);

    newOrder.save((err, result) => {
      if (err) console.log(err);
      Users.findByIdAndUpdate(newOrderData.creator, {$push: {orders: result._id}}, (err, updatedUser)=> {
        if (err) console.log(err);

        res.json({
          status: "OK",
          order: result
        })
      })
      
    })
    
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = createOrder;