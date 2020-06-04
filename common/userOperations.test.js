const {
  saveUserCashOutByWeek,
  getUserCashOutByWeek,
} = require("./userOperations");

describe("userOperations", () => {
  it("gets value by week per user", () => {
    let user = "test";
    let week = 42;
    const weekSum1 = getUserCashOutByWeek(user, week);

    saveUserCashOutByWeek(user, week, 200);
    const weekSum2 = getUserCashOutByWeek(user, week);

    expect(weekSum1).toBe(0);
    expect(weekSum2).toBe(200);
  });

  it("sums value by week per user", () => {
    let user1 = "user";
    let user2 = 2;

    let week = 42;
    saveUserCashOutByWeek(user1, week, 10);
    saveUserCashOutByWeek(user1, week, 20);
    const weekSum1 = getUserCashOutByWeek(user1, week);

    saveUserCashOutByWeek(user2, week, 42);
    const weekSum2 = getUserCashOutByWeek(user2, week);

    week = 0;
    saveUserCashOutByWeek(user1, week, 1);
    saveUserCashOutByWeek(user1, week, 2);
    const weekSum3 = getUserCashOutByWeek(user1, week);

    expect(weekSum1).toBe(30);
    expect(weekSum2).toBe(42);
    expect(weekSum3).toBe(3);
  });
});
