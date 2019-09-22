const Joi = require("joi");
const Transactions = require("../../models/transactions.model.js");
const Users = require("../../models/user.model.js");

const costsOperations = (req, res) => {
  const newData = req.body;

  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    comments: Joi.string().required(),
    amount: Joi.number().required(),
    balanceAfter: Joi.number().required(),
    type: Joi.string()
      .valid(["-"])
      .required(),
    category: Joi.string()
      .valid([
        "Обязательные расходы",
        "Еда",
        "Машина",
        "Здоровье",
        "Дети",
        "Дом",
        "Образование",
        "Досуг",
        "Прочее"
      ])
      .required()
  });

  // Return result.
  const result = Joi.validate(newData, schema);
  // result.error === null -> valid
  if (result.error) {
    // result.error.httpStatusCode = 422; 
    // throw new Error(result.error);
    return res.status(422).json({ error: result.error, message: result.error.message });
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
              if(!result) {
                res.status(400).json({ message: "user not fund", status: 'BAD' })
              };

              if (result)
                res.json({ status: "OK", transaction: newOperations });
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

module.exports = costsOperations;
