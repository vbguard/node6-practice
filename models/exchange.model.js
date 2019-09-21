const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  currency: Array
}, {timestamps: true});
const ExchangeModel = mongoose.model('Exchange', exchangeSchema);

module.exports = ExchangeModel;