const UsersModel = require('../../models/user.model.js');

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await UsersModel.findByIdAndDelete(userId);
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      deletedUser: deletedUser
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = deleteUser;