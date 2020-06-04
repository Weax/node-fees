let cashOutsByWeek = [];

exports.saveUserCashOutByWeek = (userId, week, amount) => {
  const userOps = cashOutsByWeek[userId]
    ? cashOutsByWeek[userId]
    : new Array(53).fill(0); //populate zeros to 53 weeks (max per year). This approach is fast ant optimized in V8: https://v8.dev/blog/elements-kinds
  userOps[week] += amount;
  cashOutsByWeek[userId] = userOps;
};
exports.getUserCashOutByWeek = (userId, week) => {
  return cashOutsByWeek[userId] ? cashOutsByWeek[userId][week] : 0;
};
