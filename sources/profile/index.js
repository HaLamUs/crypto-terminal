const csv = require('csv-parser');
const fs = require('fs');
const util = require('util');
const { stringify } = require("csv-stringify");
const bigNumber = require('../helpers/bigNumber');
const startSpinner = require('../helpers/loading');
const dateTimeUtils = require('../helpers/dateTimeHelpers');

const profile = module.exports;

const minCache = 30;


const cache = params => {
  var profiles =  [];
  Object.keys(params).map(key => {
    var profile = {};
    profile.token = key;
    profile.amount = params[key];
    profiles.push(profile);
  });
  const csvStream = fs.createWriteStream('./data/cache.csv');
  const columns = ['token', 'amount'];
  const stringifier = stringify({ header: true, columns: columns });

  profiles.forEach(row => stringifier.write(row));
  stringifier.pipe(csvStream);
  fs.writeFileSync('./data/cache.txt', `${Date.now()}`);
}

const check = async () => {
  if (fs.existsSync('./data/cache.txt')) {
    const readFile = util.promisify(fs.readFile);
    const data = await readFile('./data/cache.txt', 'utf8');
    const diffMins = dateTimeUtils.diffMinutes(new Date(Number(data.toString())), new Date());
    if (diffMins > minCache) {
      return false;
    }
  }
  if (fs.existsSync('./data/cache.csv')) {
    return true;
  }
  return false;
}

profile.load = async callback => {
  const hasCache = await check()
  if (hasCache) {
    let fsStream = fs.createReadStream('./data/cache.csv');
    let csvStream = csv();
    var balance = {}
    fsStream.pipe(csvStream)
      .on('data', (data) => {
        balance[data.token] = data.amount;
      })
      .on('end', () => {
        callback(balance)
    });
    return;
  }
  if(fs.existsSync('./data/transactions.csv')) {
    console.log(`\n ERROR: Please add transactions.csv in data folder`);
    return;
  }
  let fsStream = fs.createReadStream('./data/transactions.csv');
  let csvStream = csv();
  var balance = {}
  const stopSpinner = startSpinner();
  fsStream.pipe(csvStream)
    .on('data', (data) => {
      if (!(data.token in balance)) {
        balance[data.token] = 0;
      }
      if (data.transaction_type == 'DEPOSIT') {
        balance[data.token] = bigNumber(balance[data.token]).plus(data.amount).toNumber();
      }
      if (data.transaction_type == 'WITHDRAWAL') {
        balance[data.token] = bigNumber(balance[data.token]).minus(data.amount).toNumber();
      }
    })
    .on('end', () => {
      setTimeout(() => {
        stopSpinner()
      }, 0);
      cache(balance);
      callback(balance);
  });
}