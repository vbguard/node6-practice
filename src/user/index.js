// варіант 1 імпорт/експорт
const getUserController = require('./user.controller');
const createUserController = require('./user.controller');
const UserModel = require('./user.model');

module.exports = {
    getUserController,
    createUserController,
    UserModel
};

// варіант 2 імпорт/експорт
module.exports.getUserController = require('./user.controller');
module.exports.createUserController = require('./user.controller');
