const dateTimeUtils = module.exports;

dateTimeUtils.getTimestamp = date => {
  return parseInt(new Date(date).getTime() / 1000, 10);
};

dateTimeUtils.diffMinutes = (date1, date2) => {
  const diffInTime = new Date(date2).getTime() - new Date(date1).getTime();
  return Math.round(Math.abs(diffInTime / (1000 * 60)));
};