const OrdersModel = require('../../models/user.model.js');

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await OrdersModel.findById(orderId);
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      deletedOrder: deletedOrder
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = deleteOrder;