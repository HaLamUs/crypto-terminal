#!/usr/bin/env node
const yargs = require("yargs");
const _ = require('lodash');
const portfolioService = require('../sources/portfolio/');
const profile = require('../sources/profile/');
const dateTimeUtils = require('../sources/helpers/dateTimeHelpers');

const options = yargs
  .usage(`Default return the latest portfolio value per token in USD 
    Usage: 
    -t <token> return the latest portfolio value for that token in USD
    -d <date> return the portfolio value per token in USD on that date
    -t -d <token and date> return the portfolio token value in USD by given date`)
  .option("t", { alias: "token", describe: "Token you want to check", type: "string" })
  .option("d", { alias: "date", describe: "Date you want to check", type: "string" })
  .argv;

var main = (balance) => {
  var filtered = balance;
  var timeStamp = 0;
  if(options.token) {
    const allowed = Array(options.token.toUpperCase());
    filtered = Object.keys(balance)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = balance[key];
        return obj;
      }, {});
    if (_.isEmpty(filtered)) {
      console.log(`\n 404: Token not found!`);
      return;
    }
    if (_.isNil(options.date)) {
      portfolioService.build(filtered);
      return;
    }
  }
  if(options.date) {
    timeStamp = dateTimeUtils.getTimestamp(options.date.toString());
    if (timeStamp < 0) {
      console.log(`\n 400: Invalid date!`);
      return;
    }
    if (_.isNil(options.token)) {
      portfolioService.buildByDate({ timeStamp, filtered })
      return;
    }
  }
  if(options.date && options.token) {
    portfolioService.buildWithFilter({ timeStamp, token: options.token, filtered })
  }
  else {
    portfolioService.build(balance);
  }
};

profile.load(main);
