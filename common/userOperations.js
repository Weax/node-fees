let cashOutsByWeek = [];

//week is number of weeks passed from the first monday of 1970 (or use any arbitrary monday you like)

exports.saveUserCashOutByWeek = (userId, week, amount) => {
  const userOps = cashOutsByWeek[userId] ? cashOutsByWeek[userId] : [];
  const weekAmount = userOps[week] ? userOps[week] : 0;
  userOps[week] = weekAmount + amount;
  cashOutsByWeek[userId] = userOps;
};
exports.getUserCashOutByWeek = (userId, week) => {
  return cashOutsByWeek[userId] ? cashOutsByWeek[userId][week] : 0;
};
