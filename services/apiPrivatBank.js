const axios = require("axios");

const getDataApiPb = async () => {
  const getDataFromPbApi = await axios.get(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
  );
  return getDataFromPbApi.data;
};

module.exports = getDataApiPb;