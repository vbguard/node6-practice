const router = require('express').Router();
const transactionsControllers = require('../../controllers/transactions');

router.get('/:userId', transactionsControllers.getTransactionsByUserId); // get order by id


module.exports = router;