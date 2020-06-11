const {
  saveUserCashOutByWeek,
  getUserCashOutByWeek,
} = require("./userOperations");

const moment = require("moment");

exports.countCashIn = (amount, feeValue, feeMax) => {
  let fee = (amount * feeValue) / 100;
  return fee > feeMax ? feeMax : fee;
};

exports.countCashOutJuridical = (amount, feeValue, feeMin) => {
  let fee = (amount * feeValue) / 100;
  return fee < feeMin ? feeMin : fee;
};

exports.countCashOutNatural = (amount, feeValue, userId, operationDate, weekLimit) => {
  const currDate = moment(operationDate);
  const startDate = moment("1970-01-05");
  const week = currDate.diff(startDate, "weeks");

  saveUserCashOutByWeek(userId, week, amount);
  const weekSum = getUserCashOutByWeek(userId, week);

  //set amount to exceeded only
  amount =
    weekSum < weekLimit
      ? 0
      : weekSum > amount + weekLimit
      ? amount
      : weekSum - weekLimit;

  return (amount * feeValue) / 100;
};
