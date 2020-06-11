const {
  countCashIn,
  countCashOutJuridical,
  countCashOutNatural,
} = require("./commissions");

const calculate = (obj, fees) => {
  const { feesCashIn, feesCashOutNatural, feesCashOutLegal } = fees;
  const amount = obj.operation.amount;

  let fee = 0;

  if (obj.type === "cash_in") {
    fee = countCashIn(amount, feesCashIn.percents, feesCashIn.max.amount);
  } else if (obj.type === "cash_out") {
    if (obj.user_type === "natural") {
      fee = countCashOutNatural(
        amount,
        feesCashOutNatural.percents,
        obj.user_id,
        obj.date,
        feesCashOutNatural.week_limit.amount
      );
    } else if (obj.user_type === "juridical") {
      fee = countCashOutJuridical(
        amount,
        feesCashOutLegal.percents,
        feesCashOutLegal.min.amount
      );
    }
  }

  return fee;
};

module.exports = calculate;
