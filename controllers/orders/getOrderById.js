const OrdersModel = require('../../models/orders.model.js');

const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const findOrder = await OrdersModel.findById(orderId);
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      order: findOrder
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = getOrderById;