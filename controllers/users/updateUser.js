const UsersModel = require('../../models/user.model.js');

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  try {
    const updateUser = await UsersModel.findByIdAndUpdate(userId, { $push: updatedData });
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      user: updateUser
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = updateUser;