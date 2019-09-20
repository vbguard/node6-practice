const OrdersModel = require('../../models/user.model.js');

const getAllOrdersByUserId = async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.params.userId;

  try {
    const findOrders = await OrdersModel.find({_id: orderId, creator: userId});
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      orders: findOrders
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = getAllOrdersByUserId;