const Transactions = require("../../models/transactions.model.js");

const getTransactionsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await Transactions.find({ userId });
    res.json({ transactions: result });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = getTransactionsByUserId;
