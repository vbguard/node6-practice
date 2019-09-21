const Joi = require('joi');
const Transactions = require("../../models/transactions.model.js");
const Users = require("../../models/user.model.js");

const incomeOperations = (req, res) => {
  const newData = req.body;

  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    comments: Joi.string().required(),
    amount: Joi.number().required(),
    balanceAfter: Joi.number().required(),
    type: Joi.string()
      .valid(["+"])
      .required()
  });

  // Return result.
  const result = Joi.validate(newData, schema);
  // result.error === null -> valid
  if (result.error) {
    res.json({ error: error });
  }

  if (result.value) {
  const newOperations = new Transactions(result.value);

  newOperations
    .save()
    .then(result => {
      if (result) {
        Users.findByIdAndUpdate(newData.userId, {
          $push: { transactions: newOperations._id }
        })
          .then(result => {
            if (result) res.json({ status: "OK", transaction: newOperations });
          })
          .catch(err => {
            res.json({ err });
          });
      }
    })
    .catch(err => {
      res.json({ err });
    });
  }
};

module.exports = incomeOperations;
