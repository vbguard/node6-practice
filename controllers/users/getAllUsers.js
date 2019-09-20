const UsersModel = require('../../models/user.model.js');

const getAllUsers = async (req, res) => {

  try {
    const findUser = await UsersModel.find({}, {'__v': 0 });
    // const findUser = await UsersModel.find({ _id: userId });
    res.json({
      status: "OK",
      users: findUser
    })
  } catch (error) {
    res.status(400).json({
      status: "BAD",
      error: error,
      message: error.message
    })
  }
};

module.exports = getAllUsers;