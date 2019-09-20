const createUser = require('./createUser.js');
const updateUser = require('./updateUser.js');
const deleteUser = require('./deleteUser.js');
const getAllUsers = require('./getAllUsers.js');
const getUserById = require('./getUserById.js');

module.exports = {
    createUser,
    updateUser,
    deleteUser, 
    getAllUsers,
    getUserById
}