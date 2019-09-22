const router = require('express').Router();
const operationsControllers = require('../../controllers/operations');
const authCheck = require('../../middleware/authCheck.js');

const passport = require('passport');

const passportCheckJwt = passport.authenticate('jwt', {
  session: false
}); 

router.post('/income', passportCheckJwt, operationsControllers.incomeOperations);
router.post('/costs', passportCheckJwt, operationsControllers.costsOperations);

module.exports = router;