const cron = require("node-cron");


// https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5
cron.schedule("0 0 0,12 * * *", async () => {
  console.log('Cron work update Currency');
  require('../services/saveCurrencyInDB.js')();
});
