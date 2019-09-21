const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const transactionsRoutes = require('./transactionsRoutes.js');
const operationsRoutes = require('./operationsRoutes.js');

router.use('/transactions', transactionsRoutes);
router.use('/operations', operationsRoutes);
router.use('/user', userRoutes);

module.exports = router;