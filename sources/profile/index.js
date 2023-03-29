const csv = require('csv-parser');
const fs = require('fs');
const bigNumber = require('../helpers/bigNumber');

const profile = module.exports;

profile.load = callback => {
  let fsStream = fs.createReadStream('./data/transactions.csv');
  let csvStream = csv();
  var balance = {}

  console.time('Read whole file');
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
      console.timeEnd('Read whole file');
      callback(balance);
  });
}