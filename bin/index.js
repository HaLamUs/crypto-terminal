#!/usr/bin/env node
const yargs = require("yargs");
const _ = require('lodash');
const portfolioService = require('../sources/portfolio/');
const dateTimeUtils = require('../sources/helpers/dateTimeHelpers');

const options = yargs
  .usage(`Blank arg return the latest portfolio value per token in USD 
    Usage: 
    -t <token> return the latest portfolio value for that token in USD
    -d <date> return the portfolio value per token in USD on that date
    -t -d <token and date> return the portfolio value of that token in USD on that date`)
  .option("t", { alias: "token", describe: "Token you want to check", type: "string" })
  .option("d", { alias: "date", describe: "Date you want to check", type: "string" })
  .argv;

const params = {"BTC": 2.2332, "ETH": 0.0023212}
if(options.token) {
  console.log(`\n The token you requested is: ${options.token}`);
  const allowed = Array(options.token.toUpperCase());
  const filtered = Object.keys(params)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = params[key];
      return obj;
    }, {});
  if (_.isEmpty(filtered)) {
    console.log(`\n 404: Token not found!`);
  }
  else if(options.date && options.token) {
    console.log(`\n The date you requested is: ${options.date} token ${options.token}`);
    const timeStamp = dateTimeUtils.getTimestamp(options.date);
    if (timeStamp < 0) {
      console.log(`\n 400: Invalid date!`);
    }
    else {
      portfolioService.build2({ timeStamp, token: options.token, filtered })
    }
  }
  else {
    portfolioService.build(filtered);
  }
}
else {
  portfolioService.build(params);
  console.log(`\n log ${JSON.stringify(options)}`);
}