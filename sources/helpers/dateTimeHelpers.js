const dateTimeUtils = module.exports;

dateTimeUtils.getTimestamp = date => {
  return parseInt(new Date(date).getTime() / 1000, 10);
};