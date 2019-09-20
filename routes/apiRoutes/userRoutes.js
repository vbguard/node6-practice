const router = require('express').Router();
const userControllers = require('../../controllers/users');

router.get('/:userId', userControllers.getUserById); // get user by id
router.get('/', userControllers.getAllUsers); // get all user from db
router.post('/', userControllers.createUser); // create user
router.put('/:userId', userControllers.updateUser); // add to some user some filed
router.put('/:userId/order'); // add to some user some filed
router.put('/:userId/fav'); // add to some user some filed
router.put('/:userId/view'); // add to some user some filed
router.patch('/:userId', userControllers.updateUser); // update user by id data
router.delete('/:userId', userControllers.deleteUser); // delete user by id from db

module.exports = router;