const OrdersModel = require('../../models/user.model.js');

const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const updatedData = req.body;

  try {
    const updateOrder = await OrdersModel.findByIdAndUpdate(orderId, { $set: updatedData });
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      order: updateOrder
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = updateOrder;