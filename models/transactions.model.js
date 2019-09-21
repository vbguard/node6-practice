const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  comments: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number
  },
  type: {
    type: String,
    enum: ["+", "-"]
  },
  balanceAfter: {
    type: Number
  },
  category: {
    type: String,
    enum: ["Обязательные расходы", "Еда", "Машина", "Здоровье", "Дети", "Дом", "Образование", "Досуг", "Прочее"]
  }
}, { timestamp: true});

const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;