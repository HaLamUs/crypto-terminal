const axios = require("axios");
const constants = require('../global/');
const bigNumber = require('../helpers/bigNumber');
const startSpinner = require('../helpers/loading');

const portfolioService = module.exports;

portfolioService.build = async params => {
  const stopSpinner = startSpinner();
  const url = constants.URL + "/data/pricemulti?tsyms=USD&fsyms=" + Object.keys(params);
  const res = await axios.get(url);
  const price = res.data
  var userData = {};
  Object.keys(params).forEach(key => {
    userData[key] = '$' + bigNumber(params[key]).multiply(price[key].USD).toValue();
  });
  setTimeout(() => {
    stopSpinner()
  }, 0);
  console.clear();
  console.log(`YOUR PORTFOLIO \n`)
  console.table(userData)
}