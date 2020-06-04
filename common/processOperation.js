const {
  saveUserCashOutByWeek,
  getUserCashOutByWeek,
} = require("./userOperations");

const moment = require("moment");

const calculate = (obj, fees) => {
  const { feesCashIn, feesCashOutNatural, feesCashOutLegal } = fees;

  let amount = obj.operation.amount;
  let fee,
    feeValue = 0;

  let feeMin = 0;
  let feeMax = Infinity;

  if (obj.type === "cash_in") {
    feeValue = feesCashIn.percents;
    feeMax = feesCashIn.max.amount;
  } else if (obj.type === "cash_out") {
    if (obj.user_type === "natural") {
      feeValue = feesCashOutNatural.percents;
      week_limit = feesCashOutNatural.week_limit.amount;

      const week = moment(obj.date).isoWeek();

      saveUserCashOutByWeek(obj.user_id, week, amount);
      const weekSum = getUserCashOutByWeek(obj.user_id, week);

      //set amount to exceeded only
      amount =
        weekSum < week_limit
          ? 0
          : weekSum > amount + week_limit
          ? amount
          : weekSum - week_limit;

    } else if (obj.user_type === "juridical") {
      feeValue = feesCashOutLegal.percents;
      feeMin = feesCashOutLegal.min.amount;
    }
  }
  fee = (amount * feeValue) / 100;
  fee = fee < feeMin ? feeMin : fee;
  fee = fee > feeMax ? feeMax : fee;

  return fee;
};

module.exports = calculate;
