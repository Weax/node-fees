const {
  countCashIn,
  countCashOutJuridical,
  countCashOutNatural,
} = require("./commissions");

/* Mock Fees */

const feesCashIn = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: "EUR",
  },
};

const feesCashOutNatural = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: "EUR",
  },
};

const feesCashOutLegal = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: "EUR",
  },
};

/* Cash In */

const mockCashIn1 = {
  date: "2016-01-05",
  user_id: 1,
  user_type: "natural",
  type: "cash_in",
  operation: { amount: 200.0, currency: "EUR" },
};
const mockCashIn2 = {
  date: "2016-01-05",
  user_id: 1,
  user_type: "natural",
  type: "cash_in",
  operation: { amount: 20000000, currency: "EUR" },
};

/* Cash Out Juridical */

const mockCashoutJuridical1 = {
  date: "2016-01-06",
  user_id: 2,
  user_type: "juridical",
  type: "cash_out",
  operation: { amount: 300, currency: "EUR" },
};
const mockCashoutJuridical2 = {
  date: "2016-01-06",
  user_id: 2,
  user_type: "juridical",
  type: "cash_out",
  operation: { amount: 3, currency: "EUR" },
};

/* Cash Out Natural same day */

const mockCashOutNatural1 = {
  date: "2016-01-07",
  user_id: 1,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 100, currency: "EUR" },
};
const mockCashOutNatural2 = {
  date: "2016-01-07",
  user_id: 1,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1000, currency: "EUR" },
};
const mockCashOutNatural3 = {
  date: "2016-01-07",
  user_id: 2,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 30000, currency: "EUR" },
};
const mockCashOutNatural4 = {
  date: "2016-01-07",
  user_id: 2,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1000, currency: "EUR" },
};
const mockCashOutNatural5 = {
  date: "2016-01-07",
  user_id: 1,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1, currency: "EUR" },
};

/* Cash Out Natural different days */

const mockCashOutNaturalW1 = {
  date: "2020-06-04",
  user_id: 3,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1001, currency: "EUR" },
};
const mockCashOutNaturalW2 = {
  date: "2020-06-05",
  user_id: 3,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1001, currency: "EUR" },
};
const mockCashOutNaturalW3 = {
  date: "2020-06-08",
  user_id: 3,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1001.12, currency: "EUR" },
};

/* Cash Out Natural different years */

const mockCashOutNaturalY1 = {
  date: "2020-01-01",
  user_id: 4,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1001, currency: "EUR" },
};
const mockCashOutNaturalY2 = {
  date: "2019-01-01",
  user_id: 4,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1, currency: "EUR" },
};
const mockCashOutNaturalY1v2 = {
  date: "2020-01-02",
  user_id: 4,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1, currency: "EUR" },
};

/* Cash Out Natural New Year test */

const mockCashOutNaturalNY1 = {
  date: "2019-12-31",
  user_id: 5,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 700, currency: "EUR" },
};
const mockCashOutNaturalNY2 = {
  date: "2020-01-01",
  user_id: 5,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 700, currency: "EUR" },
};

/* Cash Out Natural for Grandpa */

const mockCashOutNaturalOld = {
  date: "1943-05-12",
  user_id: 6,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1001, currency: "EUR" },
};

/* helpers */

const cashOutNaturalArgs = (obj) => {
  return [
    obj.operation.amount,
    feesCashOutNatural.percents,
    obj.user_id,
    obj.date,
    feesCashOutNatural.week_limit.amount,
  ];
};

describe("Commissions", () => {
  describe("Cash In", () => {
    it("calculates fee (0.03% of 200)", () => {
      const res = countCashIn(
        mockCashIn1.operation.amount,
        feesCashIn.percents,
        feesCashIn.max.amount
      );
      expect(res).toBe(0.06);
    });

    it("calculates fee limiting to max value of 5", () => {
      const res = countCashIn(
        mockCashIn2.operation.amount,
        feesCashIn.percents,
        feesCashIn.max.amount
      );
      expect(res).toBe(5);
    });
  });

  describe("Cash Out", () => {
    describe("juridical", () => {
      it("calculates fee (0.3% of 300)", () => {
        const res = countCashOutJuridical(
          mockCashoutJuridical1.operation.amount,
          feesCashOutLegal.percents,
          feesCashOutLegal.min.amount
        );
        expect(res).toBe(0.9);
      });

      it("calculates fee with min value of 0.5", () => {
        const res = countCashOutJuridical(
          mockCashoutJuridical2.operation.amount,
          feesCashOutLegal.percents,
          feesCashOutLegal.min.amount
        );
        expect(res).toBe(0.5);
      });
    });

    describe("natural", () => {
      describe("user1", () => {
        it("calculates fee of first 100 eur accrding to free week limit of 1000", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNatural1)
          );
          expect(res).toBe(0);
        });

        it("calculates fee of second same week 1000 cash out (0.3% of (1100 - 1000))", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNatural2)
          );
          expect(res).toBe(0.3);
        });

        it("calculates fee of another same week 1 cash out (0.3% of 1)", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNatural5)
          );
          expect(res).toBe(0.003);
        });
      });

      describe("user2", () => {
        it("calculates fee of first 30000 cash out (0.3% of (30000 - 1000))", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNatural3)
          );
          expect(res).toBe(87);
        });

        it("calculates fee of second same week 1000 cash out (0.3% of 1000)", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNatural4)
          );
          expect(res).toBe(3);
        });
      });

      describe("check week with same user", () => {
        it("adds operation to the same week", () => {
          countCashOutNatural(...cashOutNaturalArgs(mockCashOutNaturalW1));
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalW2)
          );
          expect(res).toBe(3.003); // from 1001
        });

        it("adds operation to other week", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalW3)
          );
          expect(res).toBeCloseTo(0.00336, 5); // from 1.12 (decimal)
        });
      });

      describe("same week nr, same user, different years", () => {
        it("first fee should be 0.3% of 1", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalY1)
          );
          expect(res).toBe(0.003); // from 1001
        });

        it("second fee should be 0", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalY2)
          );
          expect(res).toBeCloseTo(0); // less than 1000 this week
        });

        it("fee should be 0.3% of 2", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalY1v2)
          );
          expect(res).toBeCloseTo(0.006); // from 1002
        });
      });

      describe("new year test", () => {
        it("should consider two different years dates as same week", () => {
          countCashOutNatural(...cashOutNaturalArgs(mockCashOutNaturalNY1));
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalNY2)
          );
          expect(res).toBe(1.2); // from 1400
        });
      });

      describe("dates before 1970", () => {
        it("should calculate", () => {
          const res = countCashOutNatural(
            ...cashOutNaturalArgs(mockCashOutNaturalOld)
          );
          expect(res).toBe(0.003);
        });
      });
    });
  });
});
