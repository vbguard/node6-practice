const UsersModel = require('../../models/user.model.js');

const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const findUser = await UsersModel.findById(userId, {'__v': 0 });
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      user: findUser
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = getUserById;