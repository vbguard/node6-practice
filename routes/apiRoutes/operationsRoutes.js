const router = require('express').Router();
const operationsControllers = require('../../controllers/operations');

router.post('/income', operationsControllers.incomeOperations);
router.post('/costs', operationsControllers.costsOperations);

module.exports = router;